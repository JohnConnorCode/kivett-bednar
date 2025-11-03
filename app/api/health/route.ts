import {NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {settingsQuery} from '@/sanity/lib/queries'

export async function GET() {
  const env = {
    NEXT_PUBLIC_BASE_URL: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
    NEXT_PUBLIC_SANITY_PROJECT_ID: Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    NEXT_PUBLIC_SANITY_DATASET: Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET),
    NEXT_PUBLIC_SANITY_API_VERSION: Boolean(process.env.NEXT_PUBLIC_SANITY_API_VERSION),
    SANITY_API_READ_TOKEN: Boolean(process.env.SANITY_API_READ_TOKEN),
    SANITY_REVALIDATE_SECRET: Boolean(process.env.SANITY_REVALIDATE_SECRET),
  }

  let sanity: {ok: boolean; error?: string} = {ok: true}
  try {
    // Small, safe query; perspective defaults to published
    await client.fetch(settingsQuery, {}, {next: {revalidate: 1}})
  } catch (err: any) {
    sanity = {ok: false, error: err?.message || 'Sanity fetch failed'}
  }

  return NextResponse.json({
    status: 'ok',
    env,
    sanity,
    time: Date.now(),
  })
}

