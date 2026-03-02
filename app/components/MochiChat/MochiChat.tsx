'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChatFormContext } from '@/app/lib/chatbot-system-prompt'
import { ChatSessionMessage } from '@/types/ChatSession'
import ExitModal from './ExitModal'
import styles from './MochiChat.module.css'

const BOOKING_URL = 'https://calendar.app.google/JTyjcot82mYwz4wu8'

interface MochiMessage {
  id: string
  role: 'user' | 'mochi'
  content: string
  timestamp: string
  type?: 'text' | 'booking-cta'
}

interface MochiChatProps {
  formContext?: ChatFormContext
  contactId?: string
  onClose?: () => void
  initialGreeting?: string // pre-fetched GPT greeting; falls back to template if empty
  /** When true: no greeting shown on mount, no close button, standalone layout */
  standalone?: boolean
  /** Callback to go back to the landing screen (standalone only) */
  onBack?: () => void
}

function generateGreeting(ctx: ChatFormContext): string {
  const firstName = ctx.name?.split(' ')[0] ?? 'there'
  const productMap: Record<string, string> = {
    'skin-care': 'skin care',
    'hair-care': 'hair care',
    'body-care': 'body care',
    'specialized': 'specialty products',
    'multiple': 'your product line',
    'not-sure': 'your product idea',
  }
  const productLabel = ctx.productType ? productMap[ctx.productType] ?? 'your products' : 'your products'
  const companyPart = ctx.company ? ` for ${ctx.company}` : ''

  return `Hi ${firstName}! I'm Mochi.\n\nYour inquiry${companyPart} has been received — our team is reviewing it now. In the meantime, I'm here to give you fast, informed answers about ${productLabel}, formulations, MOQs, packaging, timelines, and anything else on your mind.\n\nWhat would you like to know?`
}

function getStarterQuestions(productType?: string): string[] {
  switch (productType) {
    case 'skin-care':
      return [
        'Can you develop a custom serum formula?',
        'What certifications do you offer?',
        'What is your typical production lead time?',
        'Do you offer vegan and cruelty-free formulations?',
      ]
    case 'hair-care':
      return [
        'What is your MOQ for shampoo?',
        'Can you create custom scent profiles?',
        'Do you offer sulfate-free formulas?',
        'How does private labeling work?',
      ]
    case 'body-care':
      return [
        'What packaging options do you offer?',
        'Do you have eco-friendly packaging?',
        'What are your minimum order quantities?',
        'Do you ship internationally?',
      ]
    case 'specialized':
      return [
        'What specialty products can you manufacture?',
        'What are the regulatory requirements?',
        'Can you do small batch runs for testing?',
        'How does custom formulation work?',
      ]
    case 'multiple':
      return [
        'Where do I start with multiple product lines?',
        'Can you handle all product categories?',
        'What is the timeline for a full product line?',
        'How does pricing work for multiple SKUs?',
      ]
    default:
      return [
        'What is your minimum order quantity?',
        'How long does production take?',
        'Do you offer custom formulas?',
        'How does the process work from start to finish?',
      ]
  }
}

function makeId() {
  return Math.random().toString(36).substring(2, 10)
}

// Renders a single line of text, converting URLs and markdown links to <a> tags
function renderLineWithLinks(line: string, isUser: boolean): React.ReactNode[] {
  // Match [label](url) markdown OR bare https:// URLs
  const combined = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s]+)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  const linkStyle: React.CSSProperties = {
    color: isUser ? '#d1fae5' : '#059669',
    textDecoration: 'underline',
    wordBreak: 'break-all',
  }

  while ((match = combined.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index))

    if (match[2]) {
      // Markdown link [label](url) — parens already bound the URL cleanly
      parts.push(<a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer" style={linkStyle}>{match[1]}</a>)
    } else {
      // Bare URL — strip trailing punctuation (periods, commas, etc.) that
      // belong to the surrounding sentence, not the URL itself
      const rawUrl = match[3]
      const cleanUrl = rawUrl.replace(/[.,!?;:)'"]+$/, '')
      const trailingPunct = rawUrl.slice(cleanUrl.length)
      parts.push(<a key={key++} href={cleanUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{cleanUrl}</a>)
      if (trailingPunct) parts.push(trailingPunct)
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < line.length) parts.push(line.slice(lastIndex))
  return parts.length > 0 ? parts : [line]
}

export default function MochiChat({ formContext, contactId, onClose, initialGreeting, standalone, onBack }: MochiChatProps) {
  const [messages, setMessages] = useState<MochiMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [multiLine, setMultiLine] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [bookingClicked, setBookingClicked] = useState(false)
  const [hasDeclinedExit, setHasDeclinedExit] = useState(false)
  const [starterQuestions] = useState(() => getStarterQuestions(formContext?.productType))
  const [startersDismissed, setStartersDismissed] = useState(false)
  const [sessionSaved, setSessionSaved] = useState(false)

  const startedAtRef = useRef(new Date().toISOString())
  const messageAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const greetingSetRef = useRef(false)
  const greetingFallbackRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const exitIntentFiredRef = useRef(false)

  const userMessageCount = messages.filter((m) => m.role === 'user').length

  // In standalone mode there is no form context, so skip greeting entirely
  useEffect(() => {
    if (standalone) return

    // Set the template greeting as a fallback after 7s if GPT greeting never arrives
    greetingFallbackRef.current = setTimeout(() => {
      if (!greetingSetRef.current) {
        greetingSetRef.current = true
        setMessages([{
          id: makeId(), role: 'mochi',
          content: generateGreeting(formContext ?? {}),
          timestamp: new Date().toISOString(), type: 'text',
        }])
      }
    }, 7000)
    return () => clearTimeout(greetingFallbackRef.current)
  }, [standalone]) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply GPT greeting when it arrives (prop changes from '' to a real string)
  useEffect(() => {
    if (standalone || !initialGreeting || greetingSetRef.current) return
    greetingSetRef.current = true
    clearTimeout(greetingFallbackRef.current)
    setMessages([{
      id: makeId(), role: 'mochi',
      content: initialGreeting,
      timestamp: new Date().toISOString(), type: 'text',
    }])
  }, [initialGreeting, standalone])

  // Scroll message area to bottom (not the page)
  useEffect(() => {
    const el = messageAreaRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, isLoading])

  const buildSessionMessages = useCallback(
    (msgs: MochiMessage[]): ChatSessionMessage[] =>
      msgs
        .filter((m) => m.type !== 'booking-cta')
        .map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
    []
  )

  const saveSession = useCallback(
    async (finalMessages: MochiMessage[], booked: boolean) => {
      if (sessionSaved) return
      const userMsgs = finalMessages.filter((m) => m.role === 'user')
      if (userMsgs.length === 0) return

      setSessionSaved(true)
      const payload = JSON.stringify({
        contactId: contactId ?? null,
        formSource: standalone ? 'ask-mochi' : 'contact',
        messages: buildSessionMessages(finalMessages),
        startedAt: startedAtRef.current,
        endedAt: new Date().toISOString(),
        bookingClicked: booked,
      })

      // Use sendBeacon for reliability on page unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/save-chat', new Blob([payload], { type: 'application/json' }))
      } else {
        await fetch('/api/save-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        })
      }
    },
    [contactId, standalone, buildSessionMessages, sessionSaved]
  )

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveSession(messages, bookingClicked)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [messages, bookingClicked, saveSession])

  // Exit intent — fires when mouse leaves the viewport through the top (toward browser chrome/tabs)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !exitIntentFiredRef.current &&
        !bookingClicked &&
        !showExitModal &&
        userMessageCount >= 1
      ) {
        exitIntentFiredRef.current = true
        setShowExitModal(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [userMessageCount, bookingClicked, showExitModal])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return

      setStartersDismissed(true)

      const userMsg: MochiMessage = {
        id: makeId(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toISOString(),
        type: 'text',
      }

      const updatedMessages = [...messages, userMsg]
      setMessages(updatedMessages)
      setInputValue('')
      setMultiLine(false)
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
      }
      setIsLoading(true)

      // Check if we should inject booking CTA after this message
      const newUserCount = updatedMessages.filter((m) => m.role === 'user').length

      try {
        const apiMessages = updatedMessages
          .filter((m) => m.type !== 'booking-cta')
          .map((m) => ({ role: m.role === 'mochi' ? 'assistant' : 'user', content: m.content }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages, formContext: formContext ?? {} }),
        })

        const data = await res.json()
        const replyText = data.reply ?? 'Sorry, I had trouble with that. Could you rephrase?'

        const mochiMsg: MochiMessage = {
          id: makeId(),
          role: 'mochi',
          content: replyText,
          timestamp: new Date().toISOString(),
          type: 'text',
        }

        const withReply = [...updatedMessages, mochiMsg]

        // Inject inline booking CTA after 4 user messages
        if (newUserCount === 4) {
          const ctaId = makeId()
          const ctaMsg: MochiMessage = {
            id: ctaId,
            role: 'mochi',
            content: '', // empty = loading state; filled by parallel GPT call below
            timestamp: new Date().toISOString(),
            type: 'booking-cta',
          }
          setMessages([...withReply, ctaMsg])

          // Generate personalised CTA text in parallel — update card when ready
          const ctaApiMessages = withReply
            .filter((m) => m.type !== 'booking-cta')
            .map((m) => ({ role: m.role === 'mochi' ? 'assistant' : 'user', content: m.content }))

          fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ generateCTA: true, messages: ctaApiMessages, formContext: formContext ?? {} }),
          })
            .then((r) => r.json())
            .then((ctaData) => {
              const ctaText = ctaData.reply ?? ''
              if (!ctaText) return
              setMessages((prev) =>
                prev.map((m) => m.id === ctaId ? { ...m, content: ctaText } : m)
              )
            })
            .catch(() => {}) // silently fall back to the static text shown below
        } else {
          setMessages(withReply)
        }
      } catch {
        setMessages([
          ...updatedMessages,
          {
            id: makeId(),
            role: 'mochi',
            content: 'Sorry, something went wrong. Please try again.',
            timestamp: new Date().toISOString(),
            type: 'text',
          },
        ])
      } finally {
        setIsLoading(false)
        inputRef.current?.focus()
      }
    },
    [messages, isLoading, formContext]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  const handleClose = () => {
    if (bookingClicked) {
      saveSession(messages, true)
      onClose?.()
      return
    }
    if (userMessageCount >= 1) {
      setShowExitModal(true)
    } else {
      onClose?.()
    }
  }

  const handleBookingClick = () => {
    setBookingClicked(true)
    saveSession(messages, true)
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
  }

  const handleExitConfirm = (booked: boolean) => {
    setShowExitModal(false)
    if (booked) {
      handleBookingClick()
    } else if (!hasDeclinedExit) {
      // First decline: keep chat open, show sticky reminder bar
      setHasDeclinedExit(true)
    } else {
      // Second decline: in standalone mode just dismiss (no page to close to),
      // in post-form mode close the chat panel
      if (!standalone) {
        saveSession(messages, false)
        onClose?.()
      }
    }
  }

  return (
    <div className={styles.mochiPanel}>
      {/* Mochi Header */}
      <div className={styles.mochiHeader}>
        {standalone && onBack && (
          <button className={styles.backBtn} onClick={onBack} aria-label="Back to Mochi">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
          </button>
        )}
        <div className={styles.mochiHeaderLeft}>
          <div className={styles.mochiAvatar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div>
            <div className={styles.mochiName}>Mochi</div>
            <div className={styles.mochiTagline}>Elixderm&apos;s Formulation &amp; Manufacturing Specialist</div>
          </div>
        </div>
        {!standalone && (
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close Mochi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Message Area */}
      <div className={styles.messageArea} ref={messageAreaRef}>
        {/* Typing indicator while GPT greeting is loading (not needed in standalone mode) */}
        {messages.length === 0 && !standalone && (
          <div className={`${styles.messageBubble} ${styles.mochiBubble}`}>
            <div className={styles.bubbleAvatar}>M</div>
            <div className={styles.typingIndicator}>
              <span /><span /><span />
            </div>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.type === 'booking-cta') {
            return (
              <div key={msg.id} className={styles.inlineCTA}>
                <div className={styles.inlineCTAInner}>
                  {msg.content ? (
                    <p className={styles.inlineCTAText}>{msg.content}</p>
                  ) : (
                    <div className={styles.ctaLoading}>
                      <span /><span /><span />
                    </div>
                  )}
                  <div className={styles.inlineCTAActions}>
                    <button className={styles.bookBtnPrimary} onClick={handleBookingClick}>
                      Book a Consultation Call
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12,5 19,12 12,19" />
                      </svg>
                    </button>
                    <p className={styles.ctaKeepChatting}>Or keep asking — I&apos;m not going anywhere.</p>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={msg.id}
              className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.mochiBubble}`}
            >
              {msg.role === 'mochi' && (
                <div className={styles.bubbleAvatar}>M</div>
              )}
              <div className={styles.bubbleContent}>
                {msg.content.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {renderLineWithLinks(line, msg.role === 'user')}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className={`${styles.messageBubble} ${styles.mochiBubble}`}>
            <div className={styles.bubbleAvatar}>M</div>
            <div className={styles.typingIndicator}>
              <span /><span /><span />
            </div>
          </div>
        )}

      </div>

      {/* Starter Questions */}
      {!startersDismissed && userMessageCount === 0 && (
        <div className={styles.starterArea}>
          <p className={styles.starterLabel}>Suggested questions to get started:</p>
          <div className={styles.starterChips}>
            {starterQuestions.map((q) => (
              <button
                key={q}
                className={styles.starterChip}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className={styles.inputBar}>
        <div className={`${styles.inputPill}${multiLine ? ` ${styles.inputPillMulti}` : ''}`}>
          <textarea
            ref={inputRef}
            className={styles.inputField}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              const el = e.target
              el.style.height = 'auto'
              el.style.height = `${el.scrollHeight}px`
              setMultiLine(el.scrollHeight > 44)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask Mochi anything about our manufacturing process..."
            rows={1}
            disabled={isLoading}
          />
          <button
            className={styles.sendBtn}
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5,12 12,5 19,12" />
            </svg>
          </button>
        </div>
      </div>

      <p className={styles.disclaimer}>
        Mochi is trained on Elixderm&apos;s manufacturing process, formulations, MOQs, packaging, and compliance. For a tailored quote, book a call with our team.
      </p>

      {/* Sticky reminder bar after first decline */}
      {hasDeclinedExit && !bookingClicked && (
        <div className={styles.stickyReminder}>
          <span className={styles.stickyReminderText}>
            Changed your mind? Our team is ready for a quick call.
          </span>
          <button className={styles.stickyReminderBtn} onClick={handleBookingClick}>
            Book a call
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </button>
        </div>
      )}

      {/* Portal ensures modal is rendered in document.body — bypasses any
          ancestor CSS transforms (from slide-in animations) that would
          otherwise prevent position:fixed from anchoring to the viewport */}
      {showExitModal && createPortal(
        <ExitModal
          onConfirm={() => handleExitConfirm(true)}
          onDecline={() => handleExitConfirm(false)}
          isSecondChance={hasDeclinedExit}
        />,
        document.body
      )}
    </div>
  )
}
