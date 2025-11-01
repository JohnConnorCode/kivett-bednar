import {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {allProductsQuery} from '@/sanity/lib/queries'
import {ProductCard} from '@/components/ui/ProductCard'

export const metadata: Metadata = {
  title: 'Merch | Kivett Bednar',
  description: 'Official merchandise and apparel',
}

export default async function MerchPage() {
  const {data: products} = await sanityFetch({
    query: allProductsQuery,
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Merch</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Official Kivett Bednar merchandise
        </p>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-lg">
              Merch store opening soon!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back for t-shirts, vinyl, and more.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
