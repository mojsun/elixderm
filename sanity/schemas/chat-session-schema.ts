import { defineType } from 'sanity'

const chatSession = defineType({
  name: 'chatSession',
  title: 'Mochi Chat Sessions',
  type: 'document',
  fields: [
    {
      name: 'contactId',
      title: 'Contact Submission ID',
      type: 'string',
      description: 'Sanity document ID of the linked contact or homeContact submission.',
    },
    {
      name: 'formSource',
      title: 'Form Source',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Us (Full Form)', value: 'contact' },
          { title: 'Home Contact (Quick Form)', value: 'homeContact' },
        ],
      },
      initialValue: 'contact',
    },
    {
      name: 'messages',
      title: 'Conversation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  { title: 'User', value: 'user' },
                  { title: 'Mochi', value: 'mochi' },
                ],
              },
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
            },
            {
              name: 'timestamp',
              title: 'Timestamp',
              type: 'string',
            },
          ],
          preview: {
            select: {
              role: 'role',
              content: 'content',
            },
            prepare(value: any) {
              const { role, content } = value
              const label = role === 'user' ? 'User' : 'Mochi'
              return {
                title: `[${label}] ${content?.substring(0, 80) ?? ''}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'startedAt',
      title: 'Session Started',
      type: 'datetime',
    },
    {
      name: 'endedAt',
      title: 'Session Ended',
      type: 'datetime',
    },
    {
      name: 'messageCount',
      title: 'Total Messages',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'bookingClicked',
      title: 'Clicked Book a Call',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'durationSeconds',
      title: 'Duration (seconds)',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      contactId: 'contactId',
      messageCount: 'messageCount',
      bookingClicked: 'bookingClicked',
      startedAt: 'startedAt',
    },
    prepare(value: any) {
      const { contactId, messageCount, bookingClicked, startedAt } = value
      const date = startedAt ? new Date(startedAt).toLocaleDateString() : 'No date'
      const booked = bookingClicked ? 'Booked' : 'Not booked'
      const shortId = contactId ? contactId.substring(0, 8) + '...' : 'Unknown'
      return {
        title: `${shortId} — ${messageCount ?? 0} messages`,
        subtitle: `${date} • ${booked}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'startedAtDesc',
      by: [{ field: 'startedAt', direction: 'desc' }],
    },
    {
      title: 'Most Messages',
      name: 'messageCountDesc',
      by: [{ field: 'messageCount', direction: 'desc' }],
    },
    {
      title: 'Booking Clicked First',
      name: 'bookingClickedDesc',
      by: [{ field: 'bookingClicked', direction: 'desc' }],
    },
  ],
})

export default chatSession
