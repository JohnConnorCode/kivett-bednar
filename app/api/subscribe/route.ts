import {NextRequest, NextResponse} from 'next/server'
import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId} from '@/sanity/lib/api'
import {token} from '@/sanity/lib/token'
import {z} from 'zod'

// Write client for API routes - no CDN, with token
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscriber = await writeClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      {email: validatedData.email}
    )

    if (existingSubscriber) {
      // If exists but unsubscribed, reactivate
      if (existingSubscriber.status === 'unsubscribed') {
        await writeClient
          .patch(existingSubscriber._id)
          .set({
            status: 'active',
            subscribedAt: new Date().toISOString(),
          })
          .commit()

        return NextResponse.json(
          {message: 'Welcome back! Your subscription has been reactivated.'},
          {status: 200}
        )
      }

      // Already subscribed
      return NextResponse.json(
        {message: 'This email is already subscribed!'},
        {status: 400}
      )
    }

    // Create new subscriber
    const newSubscriber = await writeClient.create({
      _type: 'newsletterSubscriber',
      email: validatedData.email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      source: 'website',
    })

    return NextResponse.json(
      {
        message: 'Successfully subscribed! Thank you for joining.',
        subscriberId: newSubscriber._id,
      },
      {status: 201}
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {message: 'Invalid email address', errors: error.errors},
        {status: 400}
      )
    }

    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {message: 'Failed to subscribe. Please try again later.'},
      {status: 500}
    )
  }
}
