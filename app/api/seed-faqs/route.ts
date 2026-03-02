/**
 * DEV-ONLY seed endpoint.
 * POST /api/seed-faqs
 *
 * Populates the Sanity database with all chatbot FAQ documents from
 * sanity/data/chatbot-faqs.ts. Run once, then disable or delete this route.
 *
 * Requires SANITY_WRITE_TOKEN in your environment.
 * Protected by SEED_SECRET to prevent accidental re-runs in production.
 *
 * Usage:
 *   curl -X POST http://localhost:3000/api/seed-faqs \
 *     -H "Content-Type: application/json" \
 *     -d '{"secret":"<your SEED_SECRET value>"}'
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'
import chatbotFaqs from '@/sanity/data/chatbot-faqs'

const sanityWriteClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(request: NextRequest) {
  // Guard: only allow if the correct secret is provided
  const { secret } = await request.json().catch(() => ({ secret: '' }))

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const results: { question: string; id: string }[] = []
  const errors: { question: string; error: string }[] = []

  for (const faq of chatbotFaqs) {
    try {
      const doc = await sanityWriteClient.create({
        _type: 'chatbotFaq',
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        isActive: faq.isActive,
        order: faq.order,
      })
      results.push({ question: faq.question, id: doc._id })
    } catch (err: any) {
      errors.push({ question: faq.question, error: err?.message ?? 'Unknown error' })
    }
  }

  return NextResponse.json(
    {
      message: `Seeded ${results.length} FAQs. ${errors.length} failed.`,
      seeded: results,
      ...(errors.length > 0 && { errors }),
    },
    { status: 200 }
  )
}
