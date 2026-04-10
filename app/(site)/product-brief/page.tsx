'use client'

import { useState } from 'react'
import styles from './ProductBrief.module.css'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const CATEGORIES = [
  { label: 'Hair Care', value: 'hair-care' },
  { label: 'Skin Care', value: 'skin-care' },
  { label: 'Body Care', value: 'body-care' },
  { label: 'Specialized Products', value: 'specialized' },
  { label: 'Multiple Categories', value: 'multiple' },
]

const GENERATIONS = [
  { label: 'Gen Z (1997–2012)', value: 'gen-z' },
  { label: 'Millennials (1981–1996)', value: 'millennials' },
  { label: 'Gen X (1965–1980)', value: 'gen-x' },
  { label: 'Baby Boomers (1946–1964)', value: 'boomers' },
  { label: 'All Ages', value: 'all' },
]

const TARGET_AUDIENCE = ['Women', 'Men', 'All Genders', 'Teens']

const ATTRIBUTES = [
  'Vegan', 'Cruelty-Free', 'Organic', 'Natural',
  'Fragrance-Free', 'Hypoallergenic', 'Paraben-Free', 'Sulfate-Free',
]

const SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'All Skin Types']

const CERTIFICATIONS = [
  'Vegan Certified', 'Cruelty-Free', 'USDA Organic',
  'EWG Verified', 'Leaping Bunny', 'Other',
]

const REGIONS = ['Canada', 'USA', 'Europe', 'Asia', 'Other']

const RETAIL_CHANNELS = ['Online (DTC)', 'Amazon', 'Retail Stores', 'Spas / Salons', 'Other']

const INGREDIENT_ORIGINS = [
  { label: 'Organic', value: 'organic' },
  { label: 'Natural', value: 'natural' },
  { label: 'Synthetic', value: 'synthetic' },
  { label: 'No Preference', value: 'no-preference' },
]

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string[]
  onChange: (val: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])
  }
  return (
    <div className={styles.checkboxGroup}>
      {options.map(opt => (
        <label key={opt} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>
}

export default function ProductBriefPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  // Contact Info
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  // Brand & Product
  const [brandName, setBrandName] = useState('')
  const [productName, setProductName] = useState('')
  const [formulationType, setFormulationType] = useState('')
  const [packagingType, setPackagingType] = useState('')
  const [productCategory, setProductCategory] = useState('')

  // Description
  const [productDescription, setProductDescription] = useState('')
  const [textureAppearance, setTextureAppearance] = useState('')
  const [skinFeel, setSkinFeel] = useState('')

  // Customer
  const [customerGeneration, setCustomerGeneration] = useState('')
  const [targetAudience, setTargetAudience] = useState<string[]>([])
  const [customerNotes, setCustomerNotes] = useState('')

  // Attributes & Skin
  const [productAttributes, setProductAttributes] = useState<string[]>([])
  const [skinTypes, setSkinTypes] = useState<string[]>([])

  // Color & Scent
  const [hasColor, setHasColor] = useState<'yes' | 'no' | ''>('')
  const [colorDescription, setColorDescription] = useState('')
  const [scentPreference, setScentPreference] = useState<'scented' | 'unscented' | ''>('')
  const [scentDescription, setScentDescription] = useState('')

  // Benchmark
  const [benchmarkProducts, setBenchmarkProducts] = useState('')

  // Ingredients
  const [ingredientOrigin, setIngredientOrigin] = useState('')
  const [ingredientsExclude, setIngredientsExclude] = useState('')
  const [ingredientsInclude, setIngredientsInclude] = useState('')
  const [certifications, setCertifications] = useState<string[]>([])
  const [certificationsOther, setCertificationsOther] = useState('')

  // Market
  const [sellingRegions, setSellingRegions] = useState<string[]>([])
  const [sellingRegionsOther, setSellingRegionsOther] = useState('')
  const [productSize, setProductSize] = useState('')
  const [estimatedMsrp, setEstimatedMsrp] = useState('')
  const [retailChannels, setRetailChannels] = useState<string[]>([])

  // Notes
  const [additionalNotes, setAdditionalNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('submitting')

    try {
      const res = await fetch('/api/product-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email, address,
          brandName, productName, formulationType, packagingType, productCategory,
          productDescription, textureAppearance, skinFeel,
          customerGeneration, targetAudience, customerNotes,
          productAttributes, skinTypes,
          hasColor: hasColor === 'yes',
          colorDescription: hasColor === 'yes' ? colorDescription : undefined,
          scentPreference,
          scentDescription: scentPreference === 'scented' ? scentDescription : undefined,
          benchmarkProducts,
          ingredientOrigin, ingredientsExclude, ingredientsInclude,
          certifications,
          certificationsOther: certifications.includes('Other') ? certificationsOther : undefined,
          sellingRegions,
          sellingRegionsOther: sellingRegions.includes('Other') ? sellingRegionsOther : undefined,
          productSize, estimatedMsrp, retailChannels,
          additionalNotes,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')
      setSubmitState('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.successTitle}>Brief Submitted</h1>
          <p className={styles.successText}>
            Thank you, {name}. Your Product Development Brief has been received.
            Our team will review it before your Discovery Call.
          </p>
          <p className={styles.successText}>
            If you haven&apos;t signed and returned the NDA yet, please{' '}
            <a href="/nda.pdf" target="_blank" className={styles.successLink}>
              download it here
            </a>{' '}
            and email the signed copy to{' '}
            <a href="mailto:hello@elixderm.com" className={styles.successLink}>
              hello@elixderm.com
            </a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Product Development Brief</h1>
          <p className={styles.pageSubtitle}>
            Please complete this form before your Discovery Call. The more detail you provide,
            the better prepared our team will be to discuss your project.
          </p>
          <div className={styles.ndaBanner}>
            <span>Before you begin — please also</span>
            <a href="/nda.pdf" target="_blank" className={styles.ndaLink}>
              download and sign the Confidentiality Agreement
            </a>
            <span>and email it back to hello@elixderm.com.</span>
          </div>
        </div>
      </div>

      <main className="contact-page-main">
        <div className={styles.formOuter}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>

            {/* Contact Info */}
            <div className={styles.formSection}>
              <SectionTitle>Contact Information</SectionTitle>
              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Name <span className={styles.required}>*</span></label>
                  <input className={styles.input} type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Phone</label>
                  <input className={styles.input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                  <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Address</label>
                  <input className={styles.input} type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Brand & Product */}
            <div className={styles.formSection}>
              <SectionTitle>Brand &amp; Product</SectionTitle>
              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Brand Name <span className={styles.required}>*</span></label>
                  <input className={styles.input} type="text" value={brandName} onChange={e => setBrandName(e.target.value)} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Product Name <span className={styles.required}>*</span></label>
                  <input className={styles.input} type="text" value={productName} onChange={e => setProductName(e.target.value)} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Formulation Type</label>
                  <input className={styles.input} type="text" placeholder="e.g. Serum, Lotion, Cream" value={formulationType} onChange={e => setFormulationType(e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Packaging Type</label>
                  <input className={styles.input} type="text" placeholder="e.g. Pump bottle, Jar, Tube" value={packagingType} onChange={e => setPackagingType(e.target.value)} />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Which category does this product fall under?</label>
                <div className={styles.radioGroup}>
                  {CATEGORIES.map(c => (
                    <label key={c.value} className={styles.radioLabel}>
                      <input type="radio" name="category" value={c.value} checked={productCategory === c.value} onChange={() => setProductCategory(c.value)} />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className={styles.formSection}>
              <SectionTitle>Product Description</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Describe the product you would like to create</label>
                <textarea className={styles.textarea} rows={4} value={productDescription} onChange={e => setProductDescription(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Describe the texture and appearance of the product</label>
                <textarea className={styles.textarea} rows={3} value={textureAppearance} onChange={e => setTextureAppearance(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>How should your skin feel after product application?</label>
                <textarea className={styles.textarea} rows={3} value={skinFeel} onChange={e => setSkinFeel(e.target.value)} />
              </div>
            </div>

            {/* Customer Profile */}
            <div className={styles.formSection}>
              <SectionTitle>Customer Profile</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Select the generation that best describes your customer</label>
                <select className={styles.select} value={customerGeneration} onChange={e => setCustomerGeneration(e.target.value)}>
                  <option value="">Select a generation</option>
                  {GENERATIONS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Who is your product geared towards?</label>
                <CheckboxGroup options={TARGET_AUDIENCE} selected={targetAudience} onChange={setTargetAudience} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Is there anything else you can tell us about your customer?</label>
                <textarea className={styles.textarea} rows={3} value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} />
              </div>
            </div>

            {/* Attributes */}
            <div className={styles.formSection}>
              <SectionTitle>Product Attributes &amp; Skin Types</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Please check off any attributes relevant to your product</label>
                <CheckboxGroup options={ATTRIBUTES} selected={productAttributes} onChange={setProductAttributes} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>What skin type(s) is your product meant for?</label>
                <CheckboxGroup options={SKIN_TYPES} selected={skinTypes} onChange={setSkinTypes} />
              </div>
            </div>

            {/* Color & Scent */}
            <div className={styles.formSection}>
              <SectionTitle>Color &amp; Scent</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Would you like this product to be a certain color?</label>
                <div className={styles.radioGroup}>
                  {(['yes', 'no'] as const).map(v => (
                    <label key={v} className={styles.radioLabel}>
                      <input type="radio" name="hasColor" value={v} checked={hasColor === v} onChange={() => setHasColor(v)} />
                      <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                    </label>
                  ))}
                </div>
                {hasColor === 'yes' && (
                  <input
                    className={`${styles.input} ${styles.conditionalInput}`}
                    type="text"
                    placeholder="Please specify the color"
                    value={colorDescription}
                    onChange={e => setColorDescription(e.target.value)}
                  />
                )}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Will this product be scented or unscented?</label>
                <div className={styles.radioGroup}>
                  {(['scented', 'unscented'] as const).map(v => (
                    <label key={v} className={styles.radioLabel}>
                      <input type="radio" name="scent" value={v} checked={scentPreference === v} onChange={() => setScentPreference(v)} />
                      <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                    </label>
                  ))}
                </div>
                {scentPreference === 'scented' && (
                  <textarea
                    className={`${styles.textarea} ${styles.conditionalInput}`}
                    rows={3}
                    placeholder="Please describe the scent in full detail"
                    value={scentDescription}
                    onChange={e => setScentDescription(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Benchmark */}
            <div className={styles.formSection}>
              <SectionTitle>Benchmark Products</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Please list 1–2 benchmark products from other brands. Describe what you would like to see similar in your product.</label>
                <textarea className={styles.textarea} rows={4} value={benchmarkProducts} onChange={e => setBenchmarkProducts(e.target.value)} />
              </div>
            </div>

            {/* Ingredients */}
            <div className={styles.formSection}>
              <SectionTitle>Ingredients &amp; Certifications</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Would you like your ingredients to be of</label>
                <div className={styles.radioGroup}>
                  {INGREDIENT_ORIGINS.map(o => (
                    <label key={o.value} className={styles.radioLabel}>
                      <input type="radio" name="ingredientOrigin" value={o.value} checked={ingredientOrigin === o.value} onChange={() => setIngredientOrigin(o.value)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Are there any ingredients that should NOT be included in the formula?</label>
                <textarea className={styles.textarea} rows={3} placeholder="Please be specific" value={ingredientsExclude} onChange={e => setIngredientsExclude(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Are there any ingredients you WANT to include in the formula?</label>
                <textarea className={styles.textarea} rows={3} value={ingredientsInclude} onChange={e => setIngredientsInclude(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Would you like your product to follow any ingredient guidelines/certifications?</label>
                <CheckboxGroup options={CERTIFICATIONS} selected={certifications} onChange={setCertifications} />
                {certifications.includes('Other') && (
                  <input
                    className={`${styles.input} ${styles.conditionalInput}`}
                    type="text"
                    placeholder="Please elaborate"
                    value={certificationsOther}
                    onChange={e => setCertificationsOther(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Market & Retail */}
            <div className={styles.formSection}>
              <SectionTitle>Market &amp; Retail</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Which regions will you be selling in upon launching?</label>
                <CheckboxGroup options={REGIONS} selected={sellingRegions} onChange={setSellingRegions} />
                {sellingRegions.includes('Other') && (
                  <input
                    className={`${styles.input} ${styles.conditionalInput}`}
                    type="text"
                    placeholder="Please specify regions"
                    value={sellingRegionsOther}
                    onChange={e => setSellingRegionsOther(e.target.value)}
                  />
                )}
              </div>
              <div className={styles.fieldGrid2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Desired product size (ml, oz, or g)</label>
                  <input className={styles.input} type="text" placeholder="e.g. 50ml, 1oz" value={productSize} onChange={e => setProductSize(e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Estimated MSRP</label>
                  <input className={styles.input} type="text" placeholder="e.g. $29.99" value={estimatedMsrp} onChange={e => setEstimatedMsrp(e.target.value)} />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>What retail channels would you like your brand to be sold in?</label>
                <CheckboxGroup options={RETAIL_CHANNELS} selected={retailChannels} onChange={setRetailChannels} />
              </div>
            </div>

            {/* Additional Notes */}
            <div className={styles.formSection}>
              <SectionTitle>Additional Notes</SectionTitle>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>If there&apos;s anything else you would like to add that is not included above, please mention it here</label>
                <textarea className={styles.textarea} rows={5} value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} />
              </div>
            </div>

            {submitState === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again or email us at hello@elixderm.com.</p>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitState === 'submitting'}
            >
              {submitState === 'submitting' ? 'Submitting…' : 'Submit Product Brief'}
            </button>
          </form>
        </div>
        </div>
      </main>
    </div>
  )
}
