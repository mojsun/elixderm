const productOptions = {
  name: 'productOptions',
  title: 'Product Options Module',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Module Name',
      type: 'string',
      description: 'Internal name (e.g., "Hair Care Plans")',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Product Plans'
    },
    {
      name: 'title',
      title: 'Main Heading (H2)',
      type: 'string',
      description: 'Main heading displayed at the top',
      initialValue: 'Choose Your Plan',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subheading',
      type: 'text',
      description: 'Text below the main heading',
      rows: 2,
      initialValue: 'Select the perfect plan for your business needs'
    },
    {
      name: 'plan1',
      title: 'Plan 1 - Startup',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Plan Title (H3)',
          type: 'string',
          initialValue: 'Startup',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'features',
          title: 'Features (one per line)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            '2 Shampoos + 1 Conditioner',
            'Custom Label Included',
            '500ml & 1L Pack Sizes',
            'Three Weeks Timeline'
          ]
        }
      ]
    },
    {
      name: 'plan2',
      title: 'Plan 2 - Professional',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Plan Title (H3)',
          type: 'string',
          initialValue: 'Professional',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'features',
          title: 'Features (one per line)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            '3 Shampoos + 2 Conditioners',
            'Premium Label & Packaging',
            'All Pack Sizes (500ml, 1L, Gallon)',
            'Two Weeks Timeline',
            'Priority Support'
          ]
        },
        {
          name: 'featured',
          title: 'Mark as Featured/Recommended',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    {
      name: 'plan3',
      title: 'Plan 3 - Enterprise',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Plan Title (H3)',
          type: 'string',
          initialValue: 'Enterprise',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'features',
          title: 'Features (one per line)',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            '5+ Custom Products',
            'Complete Branding Package',
            'All Pack Sizes + Custom Sizes',
            'One Week Timeline',
            'Dedicated Account Manager',
            'Bulk Pricing Available'
          ]
        }
      ]
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Your Custom Quote',
      validation: (Rule: any) => Rule.required()
    }
  ],
  initialValue: {
    name: 'Product Plans',
    title: 'Choose Your Plan',
    subtitle: 'Select the perfect plan for your business needs',
    ctaText: 'Get Your Custom Quote'
  },
  preview: {
    select: {
      title: 'name',
      subtitle: 'title'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
}

export default productOptions
