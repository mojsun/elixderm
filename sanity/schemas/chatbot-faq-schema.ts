import { defineType } from 'sanity'

const CATEGORY_LIST = [
  { title: 'About ElixDerm', value: 'about' },
  { title: 'Private Label & Custom Manufacturing', value: 'private-label' },
  { title: 'Product Catalog & Capabilities', value: 'products' },
  { title: 'MOQ & Quantities', value: 'moq' },
  { title: 'Pricing & Case Quantities', value: 'pricing' },
  { title: 'Samples', value: 'samples' },
  { title: 'Fragrance & Formula Appearance', value: 'formula' },
  { title: 'Packaging & Labeling', value: 'packaging' },
  { title: 'Production & Lead Time', value: 'production' },
  { title: 'Shipping & Fulfillment', value: 'shipping' },
  { title: 'Regulatory & Compliance', value: 'regulatory' },
  { title: 'Business Process & Ownership', value: 'business' },
  { title: 'Payment & Terms', value: 'payment' },
  { title: 'How to Start', value: 'getting-started' },
]

const chatbotFaq = defineType({
  name: 'chatbotFaq',
  title: 'Chatbot FAQs',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: CATEGORY_LIST,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this FAQ from the chatbot without deleting it.',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order within category. Lower numbers appear first.',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      isActive: 'isActive',
    },
    prepare(value: any) {
      const { title, subtitle, isActive } = value
      const categoryLabel = CATEGORY_LIST.find((c) => c.value === subtitle)?.title ?? subtitle
      return {
        title: isActive ? title : `[OFF] ${title}`,
        subtitle: categoryLabel,
      }
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'category', direction: 'asc' },
      ],
    },
  ],
})

export default chatbotFaq
