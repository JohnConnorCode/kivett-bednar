import {NextRequest, NextResponse} from 'next/server'
import {Resend} from 'resend'
import {z} from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Send email via Resend
    const {data, error} = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Update with verified domain
      to: 'kivettbednar@gmail.com',
      subject: `Contact Form: ${validatedData.subject}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        {message: 'Failed to send email', error: error.message},
        {status: 500}
      )
    }

    return NextResponse.json(
      {message: 'Email sent successfully', data},
      {status: 200}
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {message: 'Validation error', errors: error.errors},
        {status: 400}
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}
