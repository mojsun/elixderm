import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import clientConfig from '@/sanity/config/client-config';
import { renderToString } from 'react-dom/server';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

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
  phone?: string;
  productType: string;
  timeline: string;
  quantity: string;
  formulation: string;
  vision: string;
  budget: string;
}

// Email template component with TypeScript
const EmailTemplate: React.FC<{ formData: ContactFormData }> = ({ formData }) => {
  const submissionDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return React.createElement('html', { lang: 'en' },
    React.createElement('head', null,
      React.createElement('meta', { charSet: 'UTF-8' }),
      React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      React.createElement('title', null, 'New Contact Form Submission - Elixderm'),
      React.createElement('style', null, `
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
          color: white;
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
      `)
    ),
    React.createElement('body', null,
      React.createElement('div', { className: 'email-container' },
        React.createElement('div', { className: 'header' },
          React.createElement('h1', null, 'Elixderm'),
          React.createElement('p', null, 'New Contact Form Submission')
        ),
        React.createElement('div', { className: 'content' },
          React.createElement('div', { className: 'section' },
            React.createElement('h2', { className: 'section-title' }, 'Contact Details'),
            React.createElement('div', { className: 'info-grid' },
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Name:'),
                React.createElement('span', { className: 'info-value' }, formData.name)
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Email:'),
                React.createElement('span', { className: 'info-value' },
                  React.createElement('a', { 
                    href: `mailto:${formData.email}`, 
                    style: { color: '#10b981', textDecoration: 'none' }
                  }, formData.email)
                )
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Company:'),
                React.createElement('span', { className: 'info-value' }, formData.company)
              ),
              formData.phone && React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Phone:'),
                React.createElement('span', { className: 'info-value' }, formData.phone)
              )
            )
          ),
          React.createElement('div', { className: 'section' },
            React.createElement('h2', { className: 'section-title' }, 'Project Details'),
            React.createElement('div', { className: 'info-grid' },
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Product Type:'),
                React.createElement('span', { className: 'info-value' }, formData.productType)
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Launch Timeline:'),
                React.createElement('span', { className: 'info-value' }, formData.timeline)
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Order Quantity:'),
                React.createElement('span', { className: 'info-value' }, formData.quantity)
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Formulation:'),
                React.createElement('span', { className: 'info-value' }, formData.formulation)
              ),
              React.createElement('div', { className: 'info-item' },
                React.createElement('span', { className: 'info-label' }, 'Budget Range:'),
                React.createElement('span', { className: 'info-value' }, formData.budget)
              )
            )
          ),
          React.createElement('div', { className: 'section' },
            React.createElement('h2', { className: 'section-title' }, 'Project Vision'),
            React.createElement('div', { className: 'message-box' },
              React.createElement('div', { className: 'message-text' }, formData.vision)
            )
          ),
          React.createElement('div', { className: 'timestamp' }, `Submitted on ${submissionDate}`)
        ),
        React.createElement('div', { className: 'footer' },
          React.createElement('p', { className: 'footer-text' }, 'Sent from the Elixderm Manufacturing Platform'),
          React.createElement('a', { 
            href: 'https://elixderm-second.vercel.app', 
            className: 'visit-button' 
          }, 'Visit Elixderm')
        )
      )
    )
  );
};

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validate required fields with TypeScript enforcement
    const requiredFields: (keyof ContactFormData)[] = [
      'name', 'email', 'company', 'productType', 'timeline', 
      'quantity', 'formulation', 'vision', 'budget'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create plain text version for fallback
    const textContent = `
New Contact Form Submission from Elixderm Website

Contact Information:
• Name: ${formData.name}
• Email: ${formData.email}
• Company: ${formData.company}
• Phone: ${formData.phone || 'Not provided'}

Project Details:
• Product Type: ${formData.productType}
• Launch Timeline: ${formData.timeline}
• Initial Order Quantity: ${formData.quantity}
• Formulation Needs: ${formData.formulation}
• Budget Range: ${formData.budget}

Project Vision:
${formData.vision}

---
This inquiry was submitted through the Elixderm contact form.
Please respond within 2-3 business days as promised on the website.
    `;

    // Save to Sanity CMS
    const sanityDoc = await sanityClient.create({
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone || '',
      productType: formData.productType,
      timeline: formData.timeline,
      quantity: formData.quantity,
      formulation: formData.formulation,
      vision: formData.vision,
      budget: formData.budget,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    // Render React component to HTML string
    const htmlTemplate = renderToString(React.createElement(EmailTemplate, { formData }));

    // Send email using Resend with React component
    const emailData = await resend.emails.send({
      from: 'Elixderm Contact Form <noreply@elixderm.com>',
      to: ['m.khorashahi7@gmail.com'],
      subject: `New Manufacturing Inquiry from ${formData.company}`,
      html: htmlTemplate,
      text: textContent,
      replyTo: formData.email,
    });

    return NextResponse.json(
      { 
        message: 'Contact saved and email sent successfully', 
        sanityId: sanityDoc._id,
        emailData: emailData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 