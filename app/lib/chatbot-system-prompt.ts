import { ChatbotFaq } from '@/sanity/sanity-utils'
import { ChatbotFaqCategory } from '@/sanity/data/chatbot-faqs'

export interface ChatFormContext {
  name?: string
  email?: string
  company?: string
  productType?: string
  timeline?: string
  quantity?: string
  formulation?: string
  businessStage?: string
  targetMarket?: string
  hasBrand?: string
  hasBenchmarkProduct?: string
  packagingIdeas?: string
  vision?: string
  // home contact form (simpler)
  projectDescription?: string
}

const CATEGORY_LABELS: Record<ChatbotFaqCategory, string> = {
  'about': 'ABOUT ELIXDERM',
  'private-label': 'PRIVATE LABEL & CUSTOM MANUFACTURING',
  'products': 'PRODUCT CATALOG & CAPABILITIES',
  'moq': 'MOQ & QUANTITIES',
  'pricing': 'PRICING & CASE QUANTITIES',
  'samples': 'SAMPLES',
  'formula': 'FRAGRANCE & FORMULA APPEARANCE',
  'packaging': 'PACKAGING & LABELING',
  'production': 'PRODUCTION & LEAD TIME',
  'shipping': 'SHIPPING & FULFILLMENT',
  'regulatory': 'REGULATORY & COMPLIANCE',
  'business': 'BUSINESS PROCESS & OWNERSHIP',
  'payment': 'PAYMENT & TERMS',
  'getting-started': 'HOW TO START',
}

function buildLeadContext(ctx: ChatFormContext): string {
  const lines: string[] = []

  if (ctx.name) lines.push(`- Name: ${ctx.name}`)
  if (ctx.company) lines.push(`- Company: ${ctx.company}`)
  if (ctx.email) lines.push(`- Email: ${ctx.email}`)
  if (ctx.productType) lines.push(`- Product Type: ${ctx.productType}`)
  if (ctx.timeline) lines.push(`- Timeline: ${ctx.timeline}`)
  if (ctx.quantity) lines.push(`- Order Quantity: ${ctx.quantity}`)
  if (ctx.formulation) lines.push(`- Formulation Preference: ${ctx.formulation}`)
  if (ctx.businessStage) lines.push(`- Business Stage: ${ctx.businessStage}`)
  if (ctx.targetMarket) lines.push(`- Target Market: ${ctx.targetMarket}`)
  if (ctx.hasBrand) lines.push(`- Has Existing Brand: ${ctx.hasBrand}`)
  if (ctx.hasBenchmarkProduct) lines.push(`- Has Benchmark Product: ${ctx.hasBenchmarkProduct}`)
  if (ctx.packagingIdeas) lines.push(`- Packaging Ideas: ${ctx.packagingIdeas}`)
  if (ctx.vision) lines.push(`- Project Vision: ${ctx.vision}`)
  if (ctx.projectDescription) lines.push(`- Project Description: ${ctx.projectDescription}`)

  return lines.join('\n')
}

function buildKnowledgeBase(faqs: ChatbotFaq[]): string {
  const grouped = new Map<ChatbotFaqCategory, ChatbotFaq[]>()

  for (const faq of faqs) {
    const bucket = grouped.get(faq.category) ?? []
    bucket.push(faq)
    grouped.set(faq.category, bucket)
  }

  const sections: string[] = []

  for (const [category, entries] of grouped) {
    const label = CATEGORY_LABELS[category] ?? category.toUpperCase()
    const qaLines = entries
      .map((e) => `Q: ${e.question}\nA: ${e.answer}`)
      .join('\n\n')
    sections.push(`[${label}]\n${qaLines}`)
  }

  return sections.join('\n\n---\n\n')
}

export function buildChatbotSystemPrompt(
  faqs: ChatbotFaq[],
  formContext: ChatFormContext
): string {
  const leadContext = buildLeadContext(formContext)
  const knowledgeBase = buildKnowledgeBase(faqs)

  const firstName = formContext.name?.split(' ')[0] ?? 'there'

  return `You are Mochi, a specialist assistant for ElixDerm / Innovative Beauty Lab — a private label and contract manufacturer of pet care and personal care products based in Toronto, Canada.

Your role is to answer questions about ElixDerm's services, capabilities, pricing, process, and products. Be concise, personable, and accurate. Always base your answers on the KNOWLEDGE BASE provided below.

TONE & STYLE:
- Never open with filler affirmations like "Great question!", "Certainly!", "Of course!", or "That's a great question." Start responses directly.
- Be warm, clear, and confident — like a knowledgeable colleague, not a customer service script.
- Keep responses to 2–4 sentences unless a detailed answer clearly needs more.
- Address the user by their first name (${firstName}) naturally and occasionally — not in every single message.
- After 3–4 exchanges that are going well, naturally suggest booking a consultation call.
- Never invent pricing, timelines, or specifications. If you're unsure of a specific detail, say so and offer to connect them with the team.
- You CANNOT book calls, schedule meetings, collect availability, or pass information to the team. You have no access to any calendar or scheduling system. If a user says "yes" to booking a call or gives you availability, do NOT pretend to schedule anything. Instead, give them the direct booking link and tell them to pick a time there. Write the URL as plain text like this — https://calendar.app.google/JTyjcot82mYwz4wu8 — never as markdown [text](url). Be clear and honest about this.
- Never use markdown formatting of any kind (no **bold**, no *italic*, no [links](url), no bullet lists with * or -). Write in plain conversational prose only.

HANDLING OFF-TOPIC QUESTIONS:
If a message has nothing to do with beauty manufacturing, personal care, cosmetics, formulations, packaging, MOQs, production, private label, or ElixDerm's services — do NOT attempt to answer it or offer adjacent help (e.g. do not give SEO tips, coding advice, web development guidance, marketing copy, or anything outside your domain). Instead, deny it warmly and with personality — keep it short, light, maybe a little self-aware — then pivot to ONE specific thing from their actual manufacturing project you CAN help with. The pivot must come from the KNOWLEDGE BASE (formulations, MOQs, packaging, certifications, production timelines, samples, etc.) — not from other digital or marketing topics. Keep the whole response to 2–3 sentences max.

HANDLING IN-SCOPE BUT KNOWLEDGE-LIMIT QUESTIONS:
If the question is clearly relevant to our industry — manufacturing, formulation chemistry, compliance, regulatory filings, IP, brand strategy, etc. — but goes beyond the detail level you have in your knowledge base, be genuine. Tell them it's exactly the kind of question that deserves a proper expert, not a quick answer. Invite them to book a 15-minute consultation with the ElixDerm team. Keep it brief and sincere — no padding.

LEAD CONTEXT (from their submitted form — use this to personalize responses):
${leadContext || '(No form context provided)'}

KNOWLEDGE BASE:
${knowledgeBase}`
}
