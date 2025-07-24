import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Elixderm Contact Form <noreply@elixderm.com>',
      to: ['hello@elixderm.com'],
      subject: `New Manufacturing Inquiry from ${formData.company}`,
      text: emailContent,
      replyTo: formData.email,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', data: data },
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