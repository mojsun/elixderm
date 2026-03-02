export interface ChatSessionMessage {
  role: 'user' | 'mochi'
  content: string
  timestamp: string
}

export interface ChatSession {
  _id: string
  _createdAt: string
  contactId: string
  formSource: 'contact' | 'homeContact'
  messages: ChatSessionMessage[]
  startedAt: string
  endedAt: string
  messageCount: number
  bookingClicked: boolean
  durationSeconds: number
}
