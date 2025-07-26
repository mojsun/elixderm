import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import clientConfig from '@/sanity/config/client-config';

const resend = new Resend(process.env.RESEND_API_KEY);

// Create Sanity client for writing data
const sanityClient = createClient({
  ...clientConfig,
  useCdn: false, // Important for write operations
  token: process.env.SANITY_WRITE_TOKEN, // We'll need to add this
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'productType', 'timeline', 'quantity', 'formulation', 'vision', 'budget'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create email content
    const emailContent = `
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

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Elixderm Contact Form <onboarding@resend.dev>',
      to: ['hello@elixderm.com'],
      subject: `New Manufacturing Inquiry from ${formData.company}`,
      text: emailContent,
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