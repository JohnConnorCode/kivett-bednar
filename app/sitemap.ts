import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapQuery} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapQuery,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const domain: String = headersList.get('host') as string

  // Homepage
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })

  // Static pages
  const staticPages = [
    {path: '/shows', priority: 0.9, changeFrequency: 'daily' as const},
    {path: '/merch', priority: 0.8, changeFrequency: 'weekly' as const},
    {path: '/lessons', priority: 0.7, changeFrequency: 'monthly' as const},
    {path: '/setlist', priority: 0.6, changeFrequency: 'monthly' as const},
    {path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const},
  ]

  staticPages.forEach(({path, priority, changeFrequency}) => {
    sitemap.push({
      url: `${domain}${path}`,
      lastModified: new Date(),
      priority,
      changeFrequency,
    })
  })

  // Dynamic pages from Sanity
  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number
    let changeFrequency:
      | 'monthly'
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'yearly'
      | 'never'
      | undefined
    let url: string

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          priority = 0.8
          changeFrequency = 'monthly'
          url = `${domain}/${p.slug}`
          break
        case 'post':
          priority = 0.5
          changeFrequency = 'never'
          url = `${domain}/posts/${p.slug}`
          break
        case 'event':
          priority = 0.9
          changeFrequency = 'daily'
          url = `${domain}/shows`
          break
        case 'product':
          priority = 0.8
          changeFrequency = 'weekly'
          url = `${domain}/merch/${p.slug}`
          break
        default:
          continue
      }
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      })
    }
  }

  return sitemap
}
