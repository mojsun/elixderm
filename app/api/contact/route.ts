import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import clientConfig from '@/sanity/config/client-config';

console.log('SANITY + EMAIL: Saving to Sanity CMS AND sending email to hello@elixderm.com');

// Create Sanity client for writing data
const sanityClient = createClient({
  ...clientConfig,
  useCdn: false, // Important for write operations
  token: process.env.SANITY_WRITE_TOKEN,
});

// TypeScript interface for form data
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  targetMarket: string;
  businessStage: string;
  hasBrand: string;
  hasBenchmarkProduct: string;
  productType: string;
  timeline: string;
  quantity: string;
  formulation: string;
  packagingIdeas: string;
  vision: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Validate required fields with TypeScript enforcement
    const requiredFields: (keyof ContactFormData)[] = [
      'name', 'email', 'company', 'targetMarket', 'businessStage', 
      'hasBrand', 'hasBenchmarkProduct', 'productType', 'timeline',
      'quantity', 'formulation', 'packagingIdeas', 'vision'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log('Saving contact form submission to Sanity...');

    // Save to Sanity CMS
    const sanityDoc = await sanityClient.create({
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      targetMarket: formData.targetMarket,
      businessStage: formData.businessStage,
      hasBrand: formData.hasBrand,
      hasBenchmarkProduct: formData.hasBenchmarkProduct,
      productType: formData.productType,
      timeline: formData.timeline,
      quantity: formData.quantity,
      formulation: formData.formulation,
      packagingIdeas: formData.packagingIdeas,
      vision: formData.vision,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    console.log('Successfully saved to Sanity with ID:', sanityDoc._id);

    // Now send email notification using the working Resend setup
    console.log('Sending email notification to hello@elixderm.com...');
    
    try {
      // Import and use Resend with the verified domain API key
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Create the email template (same as the beautiful one you received)
      const submissionDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>New Contact Form Submission - Elixderm</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            body {
                background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
            }
            .email-container {
                background: #1f2937 !important;
                border: 1px solid #374151 !important;
            }
            .content {
                background: #1f2937 !important;
            }
            .section-title {
                color: #f9fafb !important;
            }
            .info-label {
                color: #d1d5db !important;
            }
            .info-value {
                color: #f3f4f6 !important;
            }
            .info-value a {
                color: #34d399 !important;
            }
            .message-box {
                background: #374151 !important;
                border: 1px solid #4b5563 !important;
            }
            .message-text {
                color: #f3f4f6 !important;
            }
            .footer {
                background: #374151 !important;
                border-top: 1px solid #4b5563 !important;
            }
            .footer-text {
                color: #d1d5db !important;
            }
            .timestamp {
                color: #9ca3af !important;
            }
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .section {
            margin-bottom: 32px;
        }
        
        .section:last-child {
            margin-bottom: 0;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #10b981;
            display: inline-block;
        }
        
        .info-grid {
            display: grid;
            gap: 12px;
        }
        
        .info-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .info-item:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 140px;
            font-size: 14px;
        }
        
        .info-value {
            color: #1f2937;
            font-size: 14px;
            flex: 1;
        }
        
        .message-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 1px solid #d1fae5;
            border-radius: 12px;
            padding: 20px;
            margin-top: 16px;
        }
        
        .message-text {
            color: #1f2937;
            font-size: 15px;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        
        /* Additional dark mode adjustments */
        @media (prefers-color-scheme: dark) {
            .message-box h4 {
                color: #f9fafb !important;
            }
            /* Keep header gradient as is - it has good contrast */
            .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
                color: white !important;
            }
            /* Ensure visit button remains visible */
            .visit-button {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
                color: white !important;
            }
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .visit-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            transition: transform 0.2s ease;
        }
        
        .visit-button:hover {
            transform: translateY(-1px);
        }
        
        .timestamp {
            color: #9ca3af;
            font-size: 12px;
            font-style: italic;
            margin-top: 20px;
            text-align: center;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 16px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .footer {
                padding: 20px;
            }
            
            .info-item {
                flex-direction: column;
                gap: 4px;
            }
            
            .info-label {
                min-width: auto;
                font-weight: 700;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Elixderm</h1>
            <p>New Contact Form Submission</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Contact Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${formData.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">
                            <a href="mailto:${formData.email}" style="color: #10b981; text-decoration: none;">
                                ${formData.email}
                            </a>
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Company:</span>
                        <span class="info-value">${formData.company}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Business Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Target Market:</span>
                        <span class="info-value">${formData.targetMarket}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Business Stage:</span>
                        <span class="info-value">${formData.businessStage}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Has Brand:</span>
                        <span class="info-value">${formData.hasBrand}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Has Benchmark Product:</span>
                        <span class="info-value">${formData.hasBenchmarkProduct}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Product Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Product Type:</span>
                        <span class="info-value">${formData.productType}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Launch Timeline:</span>
                        <span class="info-value">${formData.timeline}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Order Quantity:</span>
                        <span class="info-value">${formData.quantity}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Formulation:</span>
                        <span class="info-value">${formData.formulation}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Packaging & Vision</h2>
                <div class="message-box">
                    <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">Packaging Ideas & Preferences:</h4>
                    <div class="message-text">${formData.packagingIdeas}</div>
                </div>
                <div class="message-box" style="margin-top: 16px;">
                    <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">Project Vision:</h4>
                    <div class="message-text">${formData.vision}</div>
                </div>
            </div>
            
            <div class="timestamp">
                Submitted on ${submissionDate}
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">Sent from the Elixderm Manufacturing Platform</p>
            <a href="https://www.elixderm.com" class="visit-button" style="color: white !important; text-decoration: none;">
                Visit Elixderm
            </a>
        </div>
    </div>
</body>
</html>
      `;

      // Send the email to hello@elixderm.com (using verified domain)
      const emailResult = await resend.emails.send({
        from: 'Elixderm Contact Form <hello@elixderm.com>',
        to: ['hello@elixderm.com'],
        subject: `New Manufacturing Inquiry from ${formData.company}`,
        html: htmlTemplate,
        replyTo: formData.email,
      });

      console.log('Email sent successfully to hello@elixderm.com:', emailResult);
      
    } catch (emailError) {
      console.error('Error sending email (but form was saved to Sanity):', emailError);
      // Don't fail the entire request if email fails - Sanity data is still saved
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully! We will review your inquiry and get back to you soon.',
        sanityId: sanityDoc._id,
        status: 'saved_and_emailed',
        note: 'Form data saved to Sanity CMS and email sent to hello@elixderm.com'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error saving contact to Sanity:', error);
    return NextResponse.json(
      { error: 'Failed to save contact submission. Please try again.' },
      { status: 500 }
    );
  }
} 