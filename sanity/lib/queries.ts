import {defineQuery} from 'next-sanity'

/**
 * GROQ queries for Kivett Bednar site
 */

// Settings & Navigation
export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  _id,
  title,
  description,
  ogImage{
    asset->,
    alt,
    metadataBase
  },
  contactEmail,
  bookingUrl,
  socialLinks[]{
    platform,
    url
  }
}`)

export const navigationQuery = defineQuery(`*[_type == "navigation"][0]{
  _id,
  main[]{
    title,
    href,
    docRef->{
      _type,
      "slug": slug.current
    }
  },
  footer[]{
    title,
    href,
    docRef->{
      _type,
      "slug": slug.current
    }
  }
}`)

// Home Page
export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  heroSlides[]{
    _key,
    image{asset->{_id, url}, alt},
    alt
  },
  heroHeading,
  heroSubheading,
  heroTagline,
  aboutHeading,
  aboutText,
  aboutImage{asset->{_id, url}, alt},
  albumTitle,
  albumYear,
  albumFormat,
  albumDescription,
  albumImage{asset->{_id, url}, alt},
  albumFeatures,
  ctaLessonsHeading,
  ctaLessonsText,
  parallaxHeading,
  parallaxSubheading,
  parallaxImages[]{
    _key,
    image{asset->{_id, url}, alt},
    alt,
    position,
    offset
  },
  performanceSectionHeading,
  performanceImage{asset->{_id, url}, alt},
  gallerySectionHeading,
  gallerySectionSubheading,
  galleryImages[]{
    _key,
    image{asset->{_id, url}, alt},
    alt,
    width,
    height
  },
  upcomingShowsHeading
}`)

// Lessons Page
export const lessonsPageQuery = defineQuery(`*[_type == "lessonsPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, alt},
  philosophyHeading,
  philosophyText,
  philosophyImage{asset->{_id, url}, alt},
  learningItemsHeading,
  learningItems[]{
    _key,
    title,
    description
  },
  ctaBoxHeading,
  ctaBoxText,
  credentials,
  teachingImage{asset->{_id, url}, alt},
  performanceImage{asset->{_id, url}, alt}
}`)

// Contact Page
export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, alt},
  portraitImage{asset->{_id, url}, alt},
  portraitGallery[]{
    _key,
    image{asset->{_id, url}, alt},
    alt
  },
  formHeading,
  directContactHeading,
  socialHeading,
  quickLinksHeading,
  aboutHeading
}`)

// Setlist Page
export const setlistPageQuery = defineQuery(`*[_type == "setlistPage"][0]{
  _id,
  heroHeading,
  heroImage{asset->{_id, url}, alt},
  introText,
  performanceImage{asset->{_id, url}, alt},
  guitarImage{asset->{_id, url}, alt},
  ctaHeading,
  ctaText
}`)

// Shows Page
export const showsPageQuery = defineQuery(`*[_type == "showsPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, alt},
  performanceGalleryHeading,
  performanceGallerySubheading,
  performanceImages[]{
    _key,
    image{asset->{_id, url}, alt},
    alt,
    caption
  },
  upcomingShowsHeading,
  emptyStateHeading,
  emptyStateText
}`)

// Songs
export const allSongsQuery = defineQuery(`*[_type == "song"] | order(order asc){
  _id,
  title,
  key,
  artist,
  notes,
  order
}`)

// Module query fragment
const moduleFields = /* groq */ `
  _type,
  _key,
  _type == "hero" => {
    headline,
    subhead,
    mediaType,
    image{asset->, alt},
    video,
    ctas[]{label, href, variant}
  },
  _type == "richText" => {
    content
  },
  _type == "imageGallery" => {
    images[]{asset->, alt, caption}
  },
  _type == "featureGrid" => {
    items[]{title, body, iconType, icon, image{asset->}}
  },
  _type == "ctaBanner" => {
    heading,
    body,
    cta{label, href}
  },
  _type == "videoEmbed" => {
    provider,
    url
  },
  _type == "musicEmbed" => {
    provider,
    url
  },
  _type == "callToAction" => @,
  _type == "infoSection" => @
`

// Pages
export const pageBySlugQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  name,
  heading,
  subheading,
  modules[]{
    ${moduleFields}
  },
  seo{
    title,
    description,
    ogImage{asset->}
  }
}`)

export const pagesSlugs = defineQuery(`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`)

// Events
export const upcomingEventsQuery = defineQuery(`*[_type == "event" && startDateTime >= $now && !isCanceled] | order(startDateTime asc)[0...$limit]{
  _id,
  title,
  startDateTime,
  endDateTime,
  timezone,
  venue,
  address,
  city,
  state,
  country,
  ticketUrl,
  description,
  coverImage{asset->, alt},
  isCanceled,
  isSoldOut
}`)

export const pastEventsQuery = defineQuery(`*[_type == "event" && startDateTime < $now] | order(startDateTime desc)[$offset...$limit]{
  _id,
  title,
  startDateTime,
  timezone,
  venue,
  city,
  state,
  country,
  coverImage{asset->, alt}
}`)

export const eventsByMonthQuery = defineQuery(`*[_type == "event" && dateTime(startDateTime) >= dateTime($startOfMonth) && dateTime(startDateTime) < dateTime($endOfMonth)] | order(startDateTime asc){
  _id,
  title,
  startDateTime,
  timezone,
  venue,
  city,
  ticketUrl,
  isCanceled,
  isSoldOut
}`)

// Products
export const allProductsQuery = defineQuery(`*[_type == "product"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  images[0]{asset->, alt},
  priceCents,
  currency
}`)

export const productBySlugQuery = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  description,
  images[]{asset->, alt},
  priceCents,
  currency,
  options[]{name, values},
  variants[]{optionValues, priceCents, sku},
  gelatoProductUid,
  printAreas[]{areaName, artwork{asset->}},
  shippingNotes,
  seo{title, description, ogImage{asset->}}
}`)

export const productSlugsQuery = defineQuery(`*[_type == "product" && defined(slug.current)]{
  "slug": slug.current
}`)

export const featuredProductsQuery = defineQuery(`*[_type == "product"] | order(_createdAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  images[0]{asset->, alt},
  priceCents,
  currency
}`)

// Posts (blog functionality - template remnant)
export const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  date,
  coverImage{asset->, alt},
  author->{firstName, lastName, picture{asset->}}
}`)

export const postPagesSlugs = defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`)

export const allPostsQuery = defineQuery(`*[_type == "post"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  date,
  author->{firstName, lastName}
}`)

export const morePostsQuery = defineQuery(`*[_type == "post" && _id != $skip] | order(date desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  date,
  author->{firstName, lastName}
}`)

// Sitemap
export const sitemapQuery = defineQuery(`*[_type in ["page", "product", "post"] && defined(slug.current)] | order(_type asc){
  "slug": slug.current,
  _type,
  _updatedAt
}`)
