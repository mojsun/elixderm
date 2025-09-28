const news = {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100).warning('Keep titles under 100 characters for better readability')
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Rich content with text and images',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for accessibility and SEO'
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      description: 'When this news item should be published',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to publish/unpublish this news item',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishDate',
      content: 'content'
    },
    prepare(selection: any) {
      const { title, subtitle, content } = selection
      const publishDate = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'
      
      // Extract text from rich content
      let contentPreview = 'No content'
      if (content && Array.isArray(content)) {
        const textBlocks = content.filter(block => block._type === 'block')
        if (textBlocks.length > 0 && textBlocks[0].children) {
          const firstText = textBlocks[0].children.find((child: any) => child.text)
          if (firstText) {
            contentPreview = firstText.text.substring(0, 50) + '...'
          }
        }
      }
      
      return {
        title: title,
        subtitle: `${publishDate} • ${contentPreview}`
      }
    }
  },
  orderings: [
    {
      title: 'Publish Date, Newest',
      name: 'publishDateDesc',
      by: [
        {field: 'publishDate', direction: 'desc'}
      ]
    },
    {
      title: 'Publish Date, Oldest',
      name: 'publishDateAsc',
      by: [
        {field: 'publishDate', direction: 'asc'}
      ]
    }
  ]
}

export default news
