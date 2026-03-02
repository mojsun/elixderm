import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getChatbotFAQs } from '@/sanity/sanity-utils'
import { buildChatbotSystemPrompt, ChatFormContext } from '@/app/lib/chatbot-system-prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  messages?: ChatMessage[]
  formContext?: ChatFormContext
  generateGreeting?: boolean
  generateCTA?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json()
    const { messages, formContext, generateGreeting, generateCTA } = body

    const faqs = await getChatbotFAQs()
    const systemPrompt = buildChatbotSystemPrompt(faqs, formContext ?? {})

    // ── Personalized CTA generation (after N messages) ───────────────────────
    if (generateCTA) {
      if (!messages || messages.length === 0) {
        return NextResponse.json({ reply: '' }, { status: 200 })
      }
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          {
            role: 'user',
            content: `Based on this conversation, write 2 sentences for an inline card that naturally suggests booking a call. Rules: acknowledge something specific from what was actually discussed (not generic); make it feel like a next step, not an ending — they can keep chatting too; warm and direct, not pushy. No filler. No markdown.`,
          },
        ],
        temperature: 0.65,
        max_tokens: 100,
      })
      return NextResponse.json(
        { reply: completion.choices[0]?.message?.content ?? '' },
        { status: 200 }
      )
    }

    // ── Personalized greeting generation ────────────────────────────────────
    if (generateGreeting) {
      const firstName = formContext?.name?.split(' ')[0] ?? 'there'
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Write a short opening message for ${firstName}. Under 70 words total. 2 short paragraphs. Follow these rules exactly:

- ALWAYS start with "Hi ${firstName}!" as the very first words.
- Sentence 2: One brief, specific nod to their project — pick the single most interesting or distinctive detail from their submission (product goal, niche, market, or vision). One thing only, naturally — not a list.
- Paragraph 2: Use "I" not "we". Frame this as: while the team reviews their submission and gets back to them, this chat is their chance to get immediate answers right now — no waiting. Assert confidence in your knowledge of the process. End with something open and inviting like "What do you want to know?" — not a narrow technical question.
- No hollow phrases: no "feel free to ask", "I'm here to support", "exciting to see", "great niche", "looking forward", "I'd be happy to".
- No bullet points. No markdown. Plain conversational text only.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 180,
      })
      return NextResponse.json(
        { reply: completion.choices[0]?.message?.content ?? '' },
        { status: 200 }
      )
    }

    // ── Regular chat ─────────────────────────────────────────────────────────
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array is required and must not be empty.' },
        { status: 400 }
      )
    }

    for (const msg of messages) {
      if (!['user', 'assistant'].includes(msg.role) || typeof msg.content !== 'string') {
        return NextResponse.json(
          { error: 'Each message must have a role of "user" or "assistant" and a string content.' },
          { status: 400 }
        )
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.5,
      max_tokens: 512,
    })

    const reply = completion.choices[0]?.message?.content ?? ''

    return NextResponse.json({ reply, usage: completion.usage }, { status: 200 })
  } catch (error: any) {
    console.error('Chat API error:', error)

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'OpenAI API key is missing or invalid.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get a response. Please try again.' },
      { status: 500 }
    )
  }
}
