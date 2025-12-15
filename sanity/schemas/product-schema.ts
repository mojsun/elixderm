const product = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
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
      description: 'Custom name to display in navigation menu (leave empty to use Product Name)'
    },
    {
      name: 'showInMenu',
      title: 'Show in Navigation Menu',
      type: 'boolean',
      description: 'Toggle to control if this product appears in the main navigation menu',
      initialValue: true
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'string',
      description: 'Category/group for organizing products in the menu',
      options: {
        list: [
          { title: 'Hair Care', value: 'hair-care' },
          { title: 'Body Care & Wellness', value: 'body-care' },
          { title: 'Specialized Lines', value: 'specialized' },
          { title: 'Face & Skin Care', value: 'skin-care' }
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
          type: 'string'
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
    // Value Section
    {
      name: 'value',
      title: 'Value Section',
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
          name: 'images',
          title: 'Value Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image'
                },
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                },
                {
                  name: 'heading',
                  title: 'Heading',
                  type: 'string'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(4)
        }
      ]
    },
    // Image Slider Section
    {
      name: 'slider',
      title: 'Image Slider',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Slider Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image'
                },
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(3)
        }
      ]
    },
    // How It Works Section
    {
      name: 'howItWorks',
      title: 'How It Works',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'steps',
          title: 'Steps',
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
          validation: (Rule: any) => Rule.max(4)
        }
      ]
    },
    // Top CTA Section
    {
      name: 'topCTA',
      title: 'Top Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string'
        }
      ]
    },
    // Features Section
    {
      name: 'features',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string'
        },
        {
          name: 'centerImage',
          title: 'Center Product Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image'
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        },
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
                  name: 'heading',
                  title: 'Feature Heading',
                  type: 'string'
                },
                {
                  name: 'subheading',
                  title: 'Feature Subheading',
                  type: 'string'
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.max(6)
        }
      ]
    },
    // Middle CTA Section
    {
      name: 'middleCTA',
      title: 'Middle Call to Action',
      type: 'object',
      fields: [
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image'
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
          title: 'Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
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
    // Product Options Module
    {
      name: 'productOptions',
      title: 'Product Options Module',
      type: 'reference',
      to: [{ type: 'productOptions' }],
      description: 'Optional: Add a product options/pricing module above the FAQ section'
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

export default product 