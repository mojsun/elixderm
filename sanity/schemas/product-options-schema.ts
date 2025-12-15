const productOptions = {
  name: 'productOptions',
  title: 'Product Options Module',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Module Name',
      type: 'string',
      description: 'Internal name for this options module',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the options section',
      initialValue: 'Choose Your Plan'
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      description: 'Optional subtitle or description',
      rows: 2
    },
    {
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'plan',
          title: 'Plan',
          fields: [
            {
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              description: 'e.g., Startup, Professional, Enterprise',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Plan Description',
              type: 'text',
              description: 'Brief description of this plan',
              rows: 2
            },
            {
              name: 'products',
              title: 'Products Included',
              type: 'object',
              fields: [
                {
                  name: 'shampoos',
                  title: 'Number of Shampoos',
                  type: 'number',
                  initialValue: 2,
                  validation: (Rule: any) => Rule.min(0).max(10)
                },
                {
                  name: 'conditioners',
                  title: 'Number of Conditioners',
                  type: 'number',
                  initialValue: 1,
                  validation: (Rule: any) => Rule.min(0).max(10)
                }
              ]
            },
            {
              name: 'labelIncluded',
              title: 'Label Included',
              type: 'boolean',
              description: 'Whether custom labeling is included in this plan',
              initialValue: true
            },
            {
              name: 'packSizes',
              title: 'Available Pack Sizes',
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      { title: '500ml', value: '500ml' },
                      { title: '1 Liter', value: '1L' },
                      { title: 'Gallon', value: 'gallon' }
                    ]
                  }
                }
              ],
              initialValue: ['500ml', '1L']
            },
            {
              name: 'timeline',
              title: 'Timeline',
              type: 'string',
              description: 'Expected completion time',
              initialValue: 'Three weeks'
            },
            {
              name: 'featured',
              title: 'Featured Plan',
              type: 'boolean',
              description: 'Highlight this plan as recommended',
              initialValue: false
            },
            {
              name: 'price',
              title: 'Price (Optional)',
              type: 'string',
              description: 'Display price or "Contact for pricing"'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              featured: 'featured'
            },
            prepare(selection: any) {
              const { title, subtitle, featured } = selection
              return {
                title: featured ? `⭐ ${title}` : title,
                subtitle: subtitle || 'No description'
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.min(1).max(5)
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Book a Call With Us'
        },
        {
          name: 'link',
          title: 'CTA Link',
          type: 'url',
          description: 'URL for the call to action button',
          initialValue: '/contact-us'
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false
        }
      ]
    },
    {
      name: 'showOnProducts',
      title: 'Show on Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      description: 'Select which products should display this options module'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      planCount: 'plans.length'
    },
    prepare(selection: any) {
      const { title, subtitle, planCount } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${planCount || 0} plans)`
      }
    }
  }
}

export default productOptions
