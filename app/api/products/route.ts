import {NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {allProductsQuery} from '@/sanity/lib/queries'

export async function GET() {
  try {
    const products = await client.fetch(allProductsQuery)
    return NextResponse.json(products || [])
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json({error: error.message || 'Failed to fetch products'}, {status: 500})
  }
}
