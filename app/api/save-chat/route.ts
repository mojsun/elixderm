import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'
import { ChatSessionMessage } from '@/types/ChatSession'

const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

interface SaveChatBody {
  contactId: string
  formSource: 'contact' | 'homeContact'
  messages: ChatSessionMessage[]
  startedAt: string
  endedAt: string
  bookingClicked: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: SaveChatBody = await request.json()
    const { contactId, formSource, messages, startedAt, endedAt, bookingClicked } = body

    if (!contactId || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'contactId and messages are required.' },
        { status: 400 }
      )
    }

    const userMessages = messages.filter((m) => m.role === 'user')
    if (userMessages.length === 0) {
      // Nothing meaningful to save
      return NextResponse.json({ message: 'No user messages — session not saved.' }, { status: 200 })
    }

    const start = startedAt ? new Date(startedAt) : new Date()
    const end = endedAt ? new Date(endedAt) : new Date()
    const durationSeconds = Math.round((end.getTime() - start.getTime()) / 1000)

    const doc = await sanityClient.create({
      _type: 'chatSession',
      contactId,
      formSource: formSource ?? 'contact',
      messages: messages.map((m) => ({
        _type: 'object',
        _key: `${m.role}-${m.timestamp ?? Date.now()}`,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp ?? new Date().toISOString(),
      })),
      startedAt: start.toISOString(),
      endedAt: end.toISOString(),
      messageCount: messages.length,
      bookingClicked: bookingClicked ?? false,
      durationSeconds,
    })

    return NextResponse.json(
      { message: 'Chat session saved.', sessionId: doc._id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving chat session:', error)
    return NextResponse.json(
      { error: 'Failed to save chat session.' },
      { status: 500 }
    )
  }
}
