export type ChatbotFaqCategory =
  | 'about'
  | 'private-label'
  | 'products'
  | 'moq'
  | 'pricing'
  | 'samples'
  | 'formula'
  | 'packaging'
  | 'production'
  | 'shipping'
  | 'regulatory'
  | 'business'
  | 'payment'
  | 'getting-started'

export interface ChatbotFaqEntry {
  question: string
  answer: string
  category: ChatbotFaqCategory
  isActive: boolean
  order: number
}

const chatbotFaqs: ChatbotFaqEntry[] = [
  // ─── About ElixDerm ──────────────────────────────────────────────────────────
  {
    category: 'about',
    order: 1,
    isActive: true,
    question: 'What is ElixDerm / Innovative Beauty Lab?',
    answer:
      'ElixDerm is a brand and manufacturing platform operated by Innovative Beauty Lab Inc. We specialize in private label and contract manufacturing for pet care and personal care products.',
  },
  {
    category: 'about',
    order: 2,
    isActive: true,
    question: 'Where are you located?',
    answer: 'We are located in Toronto, Canada.',
  },
  {
    category: 'about',
    order: 3,
    isActive: true,
    question: 'Do you manufacture in Canada?',
    answer: 'Yes. Our products are manufactured in Canada.',
  },
  {
    category: 'about',
    order: 4,
    isActive: true,
    question: 'Do you offer in-house brands as well?',
    answer: 'Yes. We have in-house brands and also manufacture for private label clients.',
  },

  // ─── Private Label & Custom Manufacturing ────────────────────────────────────
  {
    category: 'private-label',
    order: 1,
    isActive: true,
    question: 'Do you offer private label and custom formulation?',
    answer:
      'Yes. We offer white-label / stock formulas, private label production, and custom formulation development (exclusive options available).',
  },
  {
    category: 'private-label',
    order: 2,
    isActive: true,
    question: 'Can you create custom formulas?',
    answer:
      'Yes. Custom formulas are available based on feasibility, ingredients, and project scope.',
  },
  {
    category: 'private-label',
    order: 3,
    isActive: true,
    question: 'Do you manufacture for Amazon brands?',
    answer:
      'Yes. Many of our clients sell on Amazon, and we are familiar with Amazon packaging and shipping requirements.',
  },
  {
    category: 'private-label',
    order: 4,
    isActive: true,
    question: 'Do you offer both pet and human care products?',
    answer: 'Yes. We manufacture both pet care and personal care products.',
  },

  // ─── Product Catalog & Capabilities ──────────────────────────────────────────
  {
    category: 'products',
    order: 1,
    isActive: true,
    question: 'Do you have a product catalog available?',
    answer: 'Yes. We have a product catalog of stock formulas available for customization.',
  },
  {
    category: 'products',
    order: 2,
    isActive: true,
    question: 'What products do you manufacture?',
    answer:
      'We manufacture a wide range of products including pet shampoos & conditioners, sprays and grooming products, body lotions and body wash, massage oils and body oils, and specialty skincare products.',
  },
  {
    category: 'products',
    order: 3,
    isActive: true,
    question: 'Can you manufacture shampoos and conditioners?',
    answer: 'Yes. We manufacture shampoos, conditioners, and complete grooming product lines.',
  },
  {
    category: 'products',
    order: 4,
    isActive: true,
    question: 'Do you produce massage oils and body oils?',
    answer:
      'Yes. We manufacture massage oils including relaxation blends, warming blends, essential oil-based blends, and unscented and hypoallergenic oils.',
  },
  {
    category: 'products',
    order: 5,
    isActive: true,
    question: 'Can you manufacture specialty products (sprays, ear wash, eye wash, etc.)?',
    answer:
      'Yes. Specialty products are possible depending on ingredient compatibility and regulatory requirements.',
  },

  // ─── MOQ & Quantities ─────────────────────────────────────────────────────────
  {
    category: 'moq',
    order: 1,
    isActive: true,
    question: 'What is your minimum order quantity (MOQ)?',
    answer:
      'MOQ depends on the product type, packaging format, and customization level. Stock formulas have a lower MOQ; custom formulas have a higher MOQ. We confirm MOQ after reviewing your project details.',
  },
  {
    category: 'moq',
    order: 2,
    isActive: true,
    question: 'Do you offer bulk/gallon formats?',
    answer: 'Yes. Bulk formats are available depending on product category.',
  },

  // ─── Pricing & Case Quantities ────────────────────────────────────────────────
  {
    category: 'pricing',
    order: 1,
    isActive: true,
    question: 'What is your unit pricing and bulk pricing?',
    answer:
      'Pricing depends on formula complexity and active ingredients, packaging type (plastic vs glass), order quantity, and labeling requirements. A formal quote is provided after confirming specifications.',
  },
  {
    category: 'pricing',
    order: 2,
    isActive: true,
    question: 'Do you provide case pricing?',
    answer: 'Yes. We can provide pricing per case in your quotation.',
  },
  {
    category: 'pricing',
    order: 3,
    isActive: true,
    question: 'How many units come per case?',
    answer:
      'Case pack quantities vary depending on bottle size and packaging format. We confirm case pack in the quotation.',
  },
  {
    category: 'pricing',
    order: 4,
    isActive: true,
    question: 'How much does each case cost?',
    answer:
      'Case cost depends on unit pricing, packaging, label cost, and total quantity. Final case pricing is included in the quote.',
  },

  // ─── Samples ──────────────────────────────────────────────────────────────────
  {
    category: 'samples',
    order: 1,
    isActive: true,
    question: 'Do you provide samples?',
    answer: 'Yes. Samples are available for evaluation and testing.',
  },
  {
    category: 'samples',
    order: 2,
    isActive: true,
    question: 'How much do samples cost?',
    answer: 'Sample cost depends on the product type and customization requirements.',
  },
  {
    category: 'samples',
    order: 3,
    isActive: true,
    question: 'What is the sample shipping cost?',
    answer:
      'Shipping cost depends on destination and courier method. We provide an estimate once we confirm the delivery address.',
  },

  // ─── Fragrance & Formula Appearance ──────────────────────────────────────────
  {
    category: 'formula',
    order: 1,
    isActive: true,
    question: 'What fragrance options do you offer?',
    answer:
      'We work closely with several professional fragrance houses that can develop and customize the exact scent profile you are looking for. We can share fragrance house contact information and recommendations directly in chat or by email upon request.',
  },
  {
    category: 'formula',
    order: 2,
    isActive: true,
    question: 'Can you make fragrance-free products?',
    answer: 'Yes. Unscented and fragrance-free formulas are available.',
  },
  {
    category: 'formula',
    order: 3,
    isActive: true,
    question: 'Can you produce clear / transparent formulas?',
    answer:
      'Yes, depending on surfactant system and ingredient selection. We can formulate for clear appearance when feasible.',
  },
  {
    category: 'formula',
    order: 4,
    isActive: true,
    question: 'Are your ingredients verified pet-safe?',
    answer:
      'Yes. We use pet-appropriate ingredient systems and can avoid known irritants when requested.',
  },
  {
    category: 'formula',
    order: 5,
    isActive: true,
    question: 'Do you offer natural and organic options?',
    answer:
      'Yes. We can formulate natural-based and organic-positioned products depending on ingredient availability.',
  },
  {
    category: 'formula',
    order: 6,
    isActive: true,
    question: 'Can you manufacture vegan and cruelty-free products?',
    answer: 'Yes. Vegan and cruelty-free formulations are available.',
  },
  {
    category: 'formula',
    order: 7,
    isActive: true,
    question: 'Do you have an in-house fragrance house?',
    answer:
      'We do not operate our own in-house fragrance house. However, we work closely with several professional fragrance houses and can provide referrals and recommendations.',
  },

  // ─── Packaging & Labeling ─────────────────────────────────────────────────────
  {
    category: 'packaging',
    order: 1,
    isActive: true,
    question: 'Can you supply packaging, or should we provide it?',
    answer:
      'Both options are available. We can source and supply packaging, or we can fill into client-supplied packaging.',
  },
  {
    category: 'packaging',
    order: 2,
    isActive: true,
    question: 'Do you offer plastic vs glass packaging?',
    answer: 'Yes. We can quote both and recommend the best option for your market.',
  },
  {
    category: 'packaging',
    order: 3,
    isActive: true,
    question: 'Do you offer eco-friendly packaging?',
    answer:
      'Yes, depending on availability. Options include rPET packaging, minimal plastic formats, and sustainable packaging solutions.',
  },
  {
    category: 'packaging',
    order: 4,
    isActive: true,
    question: 'Can I send my own label artwork?',
    answer: 'Yes. You may provide print-ready artwork, and we can apply labels during production.',
  },
  {
    category: 'packaging',
    order: 5,
    isActive: true,
    question: 'Do you offer label customization?',
    answer:
      'Yes. We support custom branding, bilingual labels (Canada), regulatory-compliant layout, and barcode integration.',
  },
  {
    category: 'packaging',
    order: 6,
    isActive: true,
    question: 'Do you provide bilingual (English/French) labels?',
    answer: 'Yes. We support bilingual labeling for the Canadian market.',
  },
  {
    category: 'packaging',
    order: 7,
    isActive: true,
    question: 'Are labels included in the price?',
    answer:
      'Labels are typically not included unless specified. Label costs vary depending on size, finish, and quantity.',
  },
  {
    category: 'packaging',
    order: 8,
    isActive: true,
    question: 'Do you offer label design?',
    answer: 'Yes. We can support label design and compliance layout services.',
  },

  // ─── Production & Lead Time ───────────────────────────────────────────────────
  {
    category: 'production',
    order: 1,
    isActive: true,
    question: 'What is your production lead time?',
    answer:
      'Lead time depends on the project type. Stock formulas have faster production timelines; custom formulation requires longer timelines due to R&D and approvals. We provide timelines after confirming product list and packaging.',
  },
  {
    category: 'production',
    order: 2,
    isActive: true,
    question: 'How long does shipping take?',
    answer:
      'Shipping time depends on destination and method (ground, air, freight). We provide estimated delivery times per region.',
  },

  // ─── Shipping & Fulfillment ───────────────────────────────────────────────────
  {
    category: 'shipping',
    order: 1,
    isActive: true,
    question: 'Do you ship internationally (USA, Mexico, EU, etc.)?',
    answer:
      'Yes. We ship internationally and can provide export documentation when required.',
  },
  {
    category: 'shipping',
    order: 2,
    isActive: true,
    question: 'Can you ship directly to customers (drop shipping / fulfillment)?',
    answer: 'Yes, depending on volume and project logistics.',
  },
  {
    category: 'shipping',
    order: 3,
    isActive: true,
    question: 'Can you ship directly to Amazon fulfillment centers?',
    answer: 'Yes. We can ship to Amazon fulfillment centers, including in the US.',
  },
  {
    category: 'shipping',
    order: 4,
    isActive: true,
    question: 'Who pays for shipping?',
    answer: 'Shipping is typically paid by the customer unless otherwise agreed.',
  },
  {
    category: 'shipping',
    order: 5,
    isActive: true,
    question: 'Who schedules shipping?',
    answer:
      "Shipping can be scheduled by the customer's freight provider, or we can help coordinate shipping if required.",
  },
  {
    category: 'shipping',
    order: 6,
    isActive: true,
    question: 'Do you provide DDP shipping (Delivered Duty Paid)?',
    answer: 'Yes, DDP can be quoted depending on destination and volume.',
  },

  // ─── Regulatory & Compliance ──────────────────────────────────────────────────
  {
    category: 'regulatory',
    order: 1,
    isActive: true,
    question: 'Are your products Health Canada compliant?',
    answer:
      'Yes. We can formulate and label products to meet Health Canada cosmetic compliance requirements.',
  },
  {
    category: 'regulatory',
    order: 2,
    isActive: true,
    question: 'Can you support Health Canada cosmetic notification / VHP filing?',
    answer:
      'Yes. We can support regulatory documentation depending on product type.',
  },
  {
    category: 'regulatory',
    order: 3,
    isActive: true,
    question: 'Do you provide MSDS / SDS and Technical Data Sheets?',
    answer:
      'Yes. We can provide SDS/MSDS, TDS (Technical Data Sheets), and product specifications.',
  },
  {
    category: 'regulatory',
    order: 4,
    isActive: true,
    question: 'Do you provide SDS and COA?',
    answer: 'Yes, depending on the raw material and product type.',
  },
  {
    category: 'regulatory',
    order: 5,
    isActive: true,
    question: 'Do you offer GMP / ISO certifications?',
    answer:
      'We can provide quality documentation and facility compliance information upon request.',
  },
  {
    category: 'regulatory',
    order: 6,
    isActive: true,
    question: 'What is your quality assurance process?',
    answer:
      'Our QA process includes incoming raw material verification, batch controls and in-process checks, finished product review, and optional microbial and stability testing.',
  },
  {
    category: 'regulatory',
    order: 7,
    isActive: true,
    question: 'Do you perform stability and microbial challenge testing?',
    answer:
      'Yes. Testing can be coordinated through accredited third-party laboratories.',
  },
  {
    category: 'regulatory',
    order: 8,
    isActive: true,
    question: 'Can you support Amazon compliance requirements?',
    answer:
      'Yes. We are familiar with Amazon seller requirements and can provide documentation where applicable.',
  },

  // ─── Business Process & Ownership ────────────────────────────────────────────
  {
    category: 'business',
    order: 1,
    isActive: true,
    question: 'How does the process work from idea to finished product?',
    answer:
      'We guide clients from concept to finished production including formulation, packaging, compliance, and delivery.',
  },
  {
    category: 'business',
    order: 2,
    isActive: true,
    question: 'Do you offer R&D support?',
    answer: 'Yes. We provide R&D and product development support for custom projects.',
  },
  {
    category: 'business',
    order: 3,
    isActive: true,
    question: 'Do you sign NDAs?',
    answer: 'Yes. NDAs can be signed upon request.',
  },
  {
    category: 'business',
    order: 4,
    isActive: true,
    question: 'Who owns the formula if it is custom developed?',
    answer:
      'Formula ownership and exclusivity can be structured contractually depending on the project.',
  },

  // ─── Payment & Terms ──────────────────────────────────────────────────────────
  {
    category: 'payment',
    order: 1,
    isActive: true,
    question: 'What are your payment options?',
    answer:
      'We accept wire transfer, ACH / e-check, and credit card (a processing fee may apply).',
  },
  {
    category: 'payment',
    order: 2,
    isActive: true,
    question: 'Do you provide product liability insurance?',
    answer:
      'We do not directly provide liability insurance, but we can provide referrals if needed.',
  },

  // ─── How to Start ─────────────────────────────────────────────────────────────
  {
    category: 'getting-started',
    order: 1,
    isActive: true,
    question: 'How do I start a project with ElixDerm?',
    answer:
      'The process is straightforward: (1) Submit your product idea or product list, (2) Choose packaging format and labeling requirements, (3) Receive a quotation and confirm MOQ, (4) Approve samples if required, (5) Confirm payment and production schedule, (6) Production begins, (7) Shipping and delivery. You can get started by booking a consultation call with our team.',
  },
]

export default chatbotFaqs
