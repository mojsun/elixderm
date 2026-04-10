import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'

const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

interface ProductBriefData {
  name: string
  phone?: string
  email: string
  address?: string
  brandName: string
  productName: string
  formulationType?: string
  packagingType?: string
  productCategory?: string
  productDescription?: string
  textureAppearance?: string
  skinFeel?: string
  customerGeneration?: string
  targetAudience?: string[]
  customerNotes?: string
  productAttributes?: string[]
  skinTypes?: string[]
  hasColor?: boolean
  colorDescription?: string
  scentPreference?: string
  scentDescription?: string
  benchmarkProducts?: string
  ingredientOrigin?: string
  ingredientsExclude?: string
  ingredientsInclude?: string
  certifications?: string[]
  certificationsOther?: string
  sellingRegions?: string[]
  sellingRegionsOther?: string
  productSize?: string
  estimatedMsrp?: string
  retailChannels?: string[]
  additionalNotes?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ProductBriefData = await request.json()

    if (!data.name || !data.email || !data.brandName || !data.productName) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, brandName, productName' },
        { status: 400 }
      )
    }

    const doc = await sanityClient.create({
      _type: 'productBrief',
      submittedAt: new Date().toISOString(),
      ...data,
    })

    // Send notification email to team
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Elixderm Platform <hello@elixderm.com>',
        to: ['hello@elixderm.com'],
        replyTo: data.email,
        subject: `New Product Brief — ${data.brandName} (${data.name})`,
        html: teamEmailTemplate(data),
      })
    } catch (emailErr) {
      console.error('Email send failed (brief saved to Sanity):', emailErr)
    }

    return NextResponse.json({ success: true, id: doc._id }, { status: 200 })
  } catch (error: unknown) {
    console.error('Product brief API error:', error)
    return NextResponse.json({ error: 'Failed to save product brief.' }, { status: 500 })
  }
}

function row(label: string, value: string | undefined | null) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#374151;font-size:13px;width:200px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1f2937;font-size:13px;vertical-align:top;">${value}</td>
    </tr>`
}

function section(title: string, rows: string) {
  if (!rows.trim()) return ''
  return `
    <div style="margin-bottom:28px;">
      <h3 style="font-size:15px;font-weight:700;color:#1f2937;margin:0 0 12px;padding-bottom:6px;border-bottom:2px solid #10b981;display:inline-block;">${title}</h3>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>`
}

function teamEmailTemplate(d: ProductBriefData) {
  const arr = (v?: string[]) => v?.join(', ') || ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Product Brief</title>
</head>
<body style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;padding:20px;margin:0;">
  <div style="max-width:640px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#10b981,#059669);padding:36px 32px;text-align:center;color:white;">
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;letter-spacing:-0.02em;">New Product Brief</h1>
      <p style="margin:0;font-size:14px;opacity:0.9;">${d.brandName} — submitted by ${d.name}</p>
    </div>
    <div style="padding:32px;">
      ${section('Contact Information', 
        row('Name', d.name) +
        row('Email', `<a href="mailto:${d.email}" style="color:#10b981;">${d.email}</a>`) +
        row('Phone', d.phone) +
        row('Address', d.address)
      )}
      ${section('Brand & Product',
        row('Brand Name', d.brandName) +
        row('Product Name', d.productName) +
        row('Formulation Type', d.formulationType) +
        row('Packaging Type', d.packagingType) +
        row('Category', d.productCategory)
      )}
      ${section('Product Description',
        row('Description', d.productDescription) +
        row('Texture & Appearance', d.textureAppearance) +
        row('Skin Feel After Application', d.skinFeel)
      )}
      ${section('Customer Profile',
        row('Generation', d.customerGeneration) +
        row('Target Audience', arr(d.targetAudience)) +
        row('Additional Customer Info', d.customerNotes)
      )}
      ${section('Attributes & Skin Types',
        row('Product Attributes', arr(d.productAttributes)) +
        row('Skin Types', arr(d.skinTypes))
      )}
      ${section('Color & Scent',
        row('Color Preference', d.hasColor ? (d.colorDescription || 'Yes') : 'No') +
        row('Scent', d.scentPreference) +
        row('Scent Description', d.scentDescription)
      )}
      ${section('Ingredients',
        row('Ingredient Origin', d.ingredientOrigin) +
        row('Ingredients to Exclude', d.ingredientsExclude) +
        row('Ingredients to Include', d.ingredientsInclude) +
        row('Certifications', arr(d.certifications)) +
        row('Other Certifications', d.certificationsOther) +
        row('Benchmark Products', d.benchmarkProducts)
      )}
      ${section('Market & Retail',
        row('Selling Regions', arr(d.sellingRegions)) +
        row('Other Regions', d.sellingRegionsOther) +
        row('Product Size', d.productSize) +
        row('Estimated MSRP', d.estimatedMsrp) +
        row('Retail Channels', arr(d.retailChannels))
      )}
      ${section('Additional Notes',
        row('Notes', d.additionalNotes)
      )}
    </div>
    <div style="background:#f8fafc;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">Submitted via elixderm.com/product-brief</p>
    </div>
  </div>
</body>
</html>`
}
