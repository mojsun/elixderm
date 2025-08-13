const service = {
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '🔬',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: (Rule: any) => Rule.required()
    },
    // Menu Settings
    {
      name: 'menuName',
      title: 'Menu Display Name',
      type: 'string',
      description: 'Custom name to display in navigation menu (leave empty to use Service Name)'
    },
    {
      name: 'showInMenu',
      title: 'Show in Navigation Menu',
      type: 'boolean',
      description: 'Toggle to control if this service appears in the main navigation menu',
      initialValue: true
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      description: 'Category/group for organizing services in the menu',
      options: {
        list: [
          { title: 'Formulation Services', value: 'formulation' },
          { title: 'Research & Development', value: 'research' },
          { title: 'Testing & Analysis', value: 'testing' },
          { title: 'Consulting', value: 'consulting' }
        ]
      }
    },
    // SEO Fields
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title that appears in search engines (optimal: 50-60 characters)',
          components: {
            input: (props: any) => {
              const React = require('react')
              const { set, unset } = require('sanity')
              
              const count = props.value ? props.value.length : 0
              
              // Extract only DOM-appropriate props
              const { placeholder, disabled, readOnly, id } = props
              
              return React.createElement('div', null,
                React.createElement('input', {
                  placeholder,
                  disabled,
                  readOnly,
                  id,
                  value: props.value || '',
                  onChange: (e: any) => props.onChange(e.target.value ? set(e.target.value) : unset()),
                  style: {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }
                }),
                React.createElement('div', {
                  style: {
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px'
                  }
                }, `(${count} characters)`)
              )
            }
          }
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description that appears in search engines (optimal: 140-155 characters)',
          components: {
            input: (props: any) => {
              const React = require('react')
              const { set, unset } = require('sanity')
              
              const count = props.value ? props.value.length : 0
              
              // Extract only DOM-appropriate props
              const { placeholder, disabled, readOnly, id } = props
              
              return React.createElement('div', null,
                React.createElement('textarea', {
                  placeholder,
                  disabled,
                  readOnly,
                  id,
                  value: props.value || '',
                  onChange: (e: any) => props.onChange(e.target.value ? set(e.target.value) : unset()),
                  rows: 3,
                  style: {
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }
                }),
                React.createElement('div', {
                  style: {
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px'
                  }
                }, `(${count} characters)`)
              )
            }
          }
        },
        {
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          description: 'Small text above the main heading'
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          description: 'Text for the call-to-action button'
        },
        {
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string',
          description: 'URL for the call-to-action button (e.g., Calendly link)'
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string'
        }
      ]
    },
    // Features Overview (first how it works section)
    {
      name: 'featuresOverview',
      title: 'Features Overview Section',
      type: 'object',
      fields: [
        {
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Feature Image',
                  type: 'image'
                },
                {
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string'
                },
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(6)
        }
      ]
    },
    // Value Section (Why Choose Us)
    {
      name: 'value',
      title: 'Value Proposition Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'image',
          title: 'Value Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string'
        }
      ]
    },
    // Service Specialties Section (Slider)
    {
      name: 'specialties',
      title: 'Service Specialties Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'items',
          title: 'Specialty Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Specialty Image',
                  type: 'image'
                },
                {
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string'
                },
                {
                  name: 'title',
                  title: 'Specialty Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Specialty Description',
                  type: 'text'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(8)
        }
      ]
    },
    // Process Section (How It Works - detailed process)
    {
      name: 'process',
      title: 'Process Section (How It Works)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Step Image',
                  type: 'image'
                },
                {
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string'
                },
                {
                  name: 'title',
                  title: 'Step Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'text'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(6)
        }
      ]
    },
    // Top CTA Row
    {
      name: 'topCTA',
      title: 'Top Call to Action Row',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'CTA URL',
          type: 'string',
          description: 'URL for the CTA link'
        }
      ]
    },
    // Product Range Section
    {
      name: 'productRange',
      title: 'Product Range Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'items',
          title: 'Product Range Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Product Image',
                  type: 'image'
                },
                {
                  name: 'imageAlt',
                  title: 'Image Alt Text',
                  type: 'string'
                },
                {
                  name: 'title',
                  title: 'Product Category Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Product Description',
                  type: 'text'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(8)
        }
      ]
    },
    // Middle CTA Section
    {
      name: 'middleCTA',
      title: 'Middle Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string'
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string'
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string'
        },
        {
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string'
        },
        {
          name: 'image',
          title: 'CTA Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string'
        }
      ]
    },
    // FAQ Section
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'string'
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ]
    },
    // Bottom CTA Section
    {
      name: 'bottomCTA',
      title: 'Bottom Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'CTA URL',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'seo.metaTitle',
      media: 'hero.image'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle ? `SEO: ${subtitle}` : 'No SEO title set',
        media: media
      }
    }
  }
}

export default service
