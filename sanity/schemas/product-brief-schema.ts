import { defineType } from 'sanity'

const productBrief = defineType({
  name: 'productBrief',
  title: 'Product Development Briefs',
  type: 'document',
  fields: [
    // Contact Info
    { name: 'submittedAt', title: 'Date Submitted', type: 'datetime' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },

    // Brand & Product
    { name: 'brandName', title: 'Brand Name', type: 'string' },
    { name: 'productName', title: 'Product Name', type: 'string' },
    { name: 'formulationType', title: 'Formulation Type', type: 'string' },
    { name: 'packagingType', title: 'Packaging Type', type: 'string' },

    // Category
    {
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hair Care', value: 'hair-care' },
          { title: 'Skin Care', value: 'skin-care' },
          { title: 'Body Care', value: 'body-care' },
          { title: 'Specialized Products', value: 'specialized' },
          { title: 'Multiple Categories', value: 'multiple' },
        ],
      },
    },

    // Product Description
    { name: 'productDescription', title: 'Product Description', type: 'text' },
    { name: 'textureAppearance', title: 'Texture & Appearance', type: 'text' },
    { name: 'skinFeel', title: 'How Skin Should Feel After Application', type: 'text' },

    // Customer Profile
    {
      name: 'customerGeneration',
      title: 'Customer Generation',
      type: 'string',
      options: {
        list: [
          { title: 'Gen Z (1997–2012)', value: 'gen-z' },
          { title: 'Millennials (1981–1996)', value: 'millennials' },
          { title: 'Gen X (1965–1980)', value: 'gen-x' },
          { title: 'Baby Boomers (1946–1964)', value: 'boomers' },
          { title: 'All Ages', value: 'all' },
        ],
      },
    },
    {
      name: 'targetAudience',
      title: 'Who Is the Product Geared Towards',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Women', value: 'women' },
          { title: 'Men', value: 'men' },
          { title: 'All Genders', value: 'all-genders' },
          { title: 'Teens', value: 'teens' },
        ],
      },
    },
    { name: 'customerNotes', title: 'Additional Customer Info', type: 'text' },

    // Attributes
    {
      name: 'productAttributes',
      title: 'Product Attributes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegan', value: 'vegan' },
          { title: 'Cruelty-Free', value: 'cruelty-free' },
          { title: 'Organic', value: 'organic' },
          { title: 'Natural', value: 'natural' },
          { title: 'Fragrance-Free', value: 'fragrance-free' },
          { title: 'Hypoallergenic', value: 'hypoallergenic' },
          { title: 'Paraben-Free', value: 'paraben-free' },
          { title: 'Sulfate-Free', value: 'sulfate-free' },
        ],
      },
    },

    // Skin Types
    {
      name: 'skinTypes',
      title: 'Skin Type(s)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Oily', value: 'oily' },
          { title: 'Dry', value: 'dry' },
          { title: 'Combination', value: 'combination' },
          { title: 'Sensitive', value: 'sensitive' },
          { title: 'Normal', value: 'normal' },
          { title: 'All Skin Types', value: 'all' },
        ],
      },
    },

    // Color & Scent
    { name: 'hasColor', title: 'Has Color Preference', type: 'boolean', initialValue: false },
    { name: 'colorDescription', title: 'Color Description', type: 'string' },
    {
      name: 'scentPreference',
      title: 'Scented or Unscented',
      type: 'string',
      options: { list: [{ title: 'Scented', value: 'scented' }, { title: 'Unscented', value: 'unscented' }] },
    },
    { name: 'scentDescription', title: 'Scent Description', type: 'text' },

    // Benchmark
    { name: 'benchmarkProducts', title: 'Benchmark Products', type: 'text' },

    // Ingredients
    {
      name: 'ingredientOrigin',
      title: 'Ingredient Origin Preference',
      type: 'string',
      options: {
        list: [
          { title: 'Organic', value: 'organic' },
          { title: 'Natural', value: 'natural' },
          { title: 'Synthetic', value: 'synthetic' },
          { title: 'No Preference', value: 'no-preference' },
        ],
      },
    },
    { name: 'ingredientsExclude', title: 'Ingredients to Exclude', type: 'text' },
    { name: 'ingredientsInclude', title: 'Ingredients to Include', type: 'text' },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegan Certified', value: 'vegan-certified' },
          { title: 'Cruelty-Free', value: 'cruelty-free-cert' },
          { title: 'USDA Organic', value: 'usda-organic' },
          { title: 'EWG Verified', value: 'ewg-verified' },
          { title: 'Leaping Bunny', value: 'leaping-bunny' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    { name: 'certificationsOther', title: 'Other Certifications (specify)', type: 'string' },

    // Market & Retail
    {
      name: 'sellingRegions',
      title: 'Selling Regions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Canada', value: 'canada' },
          { title: 'USA', value: 'usa' },
          { title: 'Europe', value: 'europe' },
          { title: 'Asia', value: 'asia' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    { name: 'sellingRegionsOther', title: 'Other Regions (specify)', type: 'string' },
    { name: 'productSize', title: 'Desired Product Size', type: 'string' },
    { name: 'estimatedMsrp', title: 'Estimated MSRP', type: 'string' },
    {
      name: 'retailChannels',
      title: 'Retail Channels',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Online (DTC)', value: 'dtc' },
          { title: 'Amazon', value: 'amazon' },
          { title: 'Retail Stores', value: 'retail' },
          { title: 'Spas / Salons', value: 'spas-salons' },
          { title: 'Other', value: 'other' },
        ],
      },
    },

    // Additional
    { name: 'additionalNotes', title: 'Additional Notes', type: 'text' },
  ],
  preview: {
    select: {
      name: 'name',
      brandName: 'brandName',
      productName: 'productName',
      submittedAt: 'submittedAt',
    },
    prepare(value: { name?: string; brandName?: string; productName?: string; submittedAt?: string }) {
      const { name, brandName, productName, submittedAt } = value
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date'
      return {
        title: `${name ?? 'Unknown'} — ${brandName ?? ''}`,
        subtitle: `${productName ?? ''} • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})

export default productBrief
