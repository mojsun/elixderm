const whoWeHelp = {
  name: 'whoWeHelp',
  title: 'Who We Help',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      description: 'Custom name to display in navigation menu (leave empty to use Name)'
    },
    {
      name: 'showInMenu',
      title: 'Show in Navigation Menu',
      type: 'boolean',
      description: 'Toggle to control if this appears in the main navigation menu',
      initialValue: true
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category/group for organizing in the menu',
      options: {
        list: [
          { title: 'Startups & Entrepreneurs', value: 'startups' },
          { title: 'Established Brands', value: 'established-brands' },
          { title: 'Retailers & Distributors', value: 'retailers' },
          { title: 'Influencers & Content Creators', value: 'influencers' }
        ]
      }
    },
    // SEO Fields
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search Engine Optimization settings for this page',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title that appears in search engine results (50-60 characters)',
          validation: (Rule: any) => Rule.max(60).warning('Meta titles should be under 60 characters')
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description that appears in search engine results (150-160 characters)',
          validation: (Rule: any) => Rule.max(160).warning('Meta descriptions should be under 160 characters')
        },
        {
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false
        }
      ]
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      description: 'Main hero banner with title, description, and image',
      fields: [
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
          description: 'Small text above the main heading'
        },
        {
          name: 'heading',
          title: 'Main Heading (H1)',
          type: 'string',
          validation: (Rule: any) => Rule.required().error('Main heading is required for SEO')
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Supporting text under the heading'
        },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          description: 'Main image displayed on the right side of the hero section',
          options: {
            hotspot: true
          }
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          description: 'Alternative text for the hero image (important for accessibility and SEO)'
        }
      ]
    },
    // Value Section (4 icons)
    {
      name: 'value',
      title: 'Value Proposition Section',
      type: 'object',
      description: 'Section with heading, description, and 4 value proposition icons',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading (H2)',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'images',
          title: 'Value Icons (4 items)',
          type: 'array',
          description: 'Four icons representing your value propositions',
          validation: (Rule: any) => Rule.max(4).warning('Maximum 4 value icons recommended'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Icon Image',
                  type: 'image',
                  options: { hotspot: true }
                },
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                },
                {
                  name: 'heading',
                  title: 'Icon Title',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    // Image Slider Section
    {
      name: 'slider',
      title: 'Image Slider Section',
      type: 'object',
      description: 'Section with 3 images in a slider format',
      fields: [
        {
          name: 'images',
          title: 'Slider Images (3 recommended)',
          type: 'array',
          description: 'Images for the slider section',
          validation: (Rule: any) => Rule.max(5).warning('Maximum 5 images recommended for optimal performance'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true }
                },
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    // How It Works Section
    {
      name: 'howItWorks',
      title: 'How It Works Section',
      type: 'object',
      description: 'Step-by-step process section with custom content',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'How It Works?'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          description: 'Optional customizable text subheading'
        },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          description: 'Steps in your process (defaults to 4 standard steps if not customized)',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Step Icon',
                  type: 'image',
                  options: { hotspot: true }
                },
                {
                  name: 'imageAlt',
                  title: 'Icon Alt Text',
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
          ]
        }
      ]
    },
    // Top CTA
    {
      name: 'topCTA',
      title: 'Top CTA Section',
      type: 'object',
      description: 'Call-to-action banner after How It Works section',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string',
          description: 'Main text for the call-to-action'
        }
      ]
    },
    // Features Section
    {
      name: 'features',
      title: 'Features Section',
      type: 'object',
      description: 'Features section with center image and surrounding feature items',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'string'
        },
        {
          name: 'centerImage',
          title: 'Center Image',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true }
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
          title: 'Feature Items (6 recommended)',
          type: 'array',
          description: 'Feature items arranged around the center image',
          validation: (Rule: any) => Rule.max(6).warning('Maximum 6 features recommended'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Feature Icon',
                  type: 'image',
                  options: { hotspot: true }
                },
                {
                  name: 'imageAlt',
                  title: 'Icon Alt Text',
                  type: 'string'
                },
                {
                  name: 'heading',
                  title: 'Feature Title',
                  type: 'string'
                },
                {
                  name: 'subheading',
                  title: 'Feature Description',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    // Middle CTA
    {
      name: 'middleCTA',
      title: 'Middle CTA Section',
      type: 'object',
      description: 'Middle call-to-action section with image and text',
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
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'image',
          title: 'CTA Image',
          type: 'image',
          options: { hotspot: true }
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
      description: 'Frequently Asked Questions section',
      fields: [
        {
          name: 'title',
          title: 'FAQ Section Title',
          type: 'string',
          initialValue: 'Frequently Asked Questions'
        },
        {
          name: 'subtitle',
          title: 'FAQ Section Subtitle',
          type: 'string'
        },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          description: 'List of frequently asked questions and answers',
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
    // Bottom CTA
    {
      name: 'bottomCTA',
      title: 'Bottom CTA Section',
      type: 'object',
      description: 'Final call-to-action section at the bottom of the page',
      fields: [
        {
          name: 'text',
          title: 'CTA Text',
          type: 'string',
          description: 'Main text for the bottom call-to-action'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text for the CTA button'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'hero.image'
    }
  }
}

export default whoWeHelp
