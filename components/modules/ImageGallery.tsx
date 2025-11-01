import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

type ImageGalleryProps = {
  images: Array<{
    asset: any
    alt: string
    caption?: string
  }>
}

export function ImageGallery({images}: ImageGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={urlFor(image.asset).width(800).height(600).url()}
              alt={image.alt || ''}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
