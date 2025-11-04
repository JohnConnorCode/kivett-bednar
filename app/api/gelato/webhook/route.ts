import {NextRequest, NextResponse} from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = process.env.GELATO_WEBHOOK_SECRET
  const sig = req.headers.get('x-gelato-signature') || req.headers.get('x-signature')
  if (secret && sig !== secret) {
    return new NextResponse('Invalid signature', {status: 401})
  }

  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ok: false})

  try {
    const gelatoOrderId = data?.orderId || data?.id
    const status = data?.status || data?.event
    if (!gelatoOrderId || !status) return NextResponse.json({ok: true})

    const {createClient} = await import('next-sanity')
    const {projectId, dataset, apiVersion} = await import('@/sanity/lib/api')
    const {token} = await import('@/sanity/lib/token')
    const writeClient = createClient({projectId, dataset, apiVersion, token, useCdn: false})

    const patches = [{set: {status}}]
    await writeClient
      .patch({query: `*[_type == "order" && gelatoOrderId == $id][0]`, params: {id: gelatoOrderId}})
      .set({status})
      .commit()
      .catch(() => null)
  } catch (e) {
    console.error('Gelato webhook error', e)
  }

  return NextResponse.json({ok: true})
}

