import { describe, expect, it } from 'vitest'
import chatbotFaqs from '../../sanity/data/chatbot-faqs'
import { buildChatbotSystemPrompt } from './chatbot-system-prompt'

const ADDRESS = '1200 Aerowood Drive, Unit 33, Mississauga, ON L4W 2S7, Canada'

describe('buildChatbotSystemPrompt', () => {
  const prompt = buildChatbotSystemPrompt([], {})

  it('gives Mochi the business address and service area', () => {
    expect(prompt).toContain(ADDRESS)
    expect(prompt).toContain('across Canada and the United States')
  })

  it('places the business in Mississauga, not Toronto', () => {
    expect(prompt).toContain('based in Mississauga, Ontario, Canada')
    expect(prompt).not.toContain('Toronto')
  })

  it('introduces NHP Mentor as a beta initiative, not a finished product', () => {
    expect(prompt).toContain('NHP Mentor (www.nhpmentor.com)')
    expect(prompt).toContain('in beta and not yet finalized')
    expect(prompt).toContain("don't present it as a finished product")
  })
})

describe('seeded location FAQ', () => {
  it('answers with the business address and service area', () => {
    const faq = chatbotFaqs.find((entry) => entry.question === 'Where are you located?')
    expect(faq?.answer).toContain(ADDRESS)
    expect(faq?.answer).toContain('across Canada and the United States')
  })
})
