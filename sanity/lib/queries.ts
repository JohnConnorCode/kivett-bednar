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

// UI Text & Labels
export const uiTextQuery = defineQuery(`*[_type == "uiText"][0]{
  _id,
  siteName,
  siteTagline,
  navShows,
  navLessons,
  navSetlist,
  navMerch,
  navContact,
  footerNavigationHeading,
  footerConnectHeading,
  footerCopyrightText,
  formLabelName,
  formLabelEmail,
  formLabelSubject,
  formLabelMessage,
  formButtonSubmit,
  formButtonSending,
  formSuccessMessage,
  buttonViewSetlist,
  buttonScheduleLesson,
  buttonBookLesson,
  buttonEmailMe,
  buttonGetInTouch,
  linkSeeAllShows,
  linkUpcomingShows,
  linkGuitarLessons,
  linkBluesSetlist,
  showsCountSingular,
  showsCountPlural,
  upcomingPrefix,
  setlistSubtitleSuffix,
  socialFacebook,
  socialInstagram
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
    image{
      asset->{_id, url},
      hotspot,
      crop,
      alt
    },
    mobileImage{
      asset->{_id, url},
      hotspot,
      crop,
      alt
    },
    alt,
    desktopPosition,
    mobilePosition
  },
  heroHeading,
  heroSubheading,
  heroTagline,
  aboutHeading,
  aboutText,
  aboutImage{
    asset->{_id, url},
    hotspot,
    crop,
    desktopPosition,
    mobilePosition,
    alt
  },
  albumTitle,
  albumYear,
  albumFormat,
  albumDescription,
  albumCoverImage{
    asset->{_id, url},
    hotspot,
    crop,
    desktopPosition,
    mobilePosition,
    alt
  },
  albumFeatures,
  ctaLessonsHeading,
  ctaLessonsText,
  parallaxHeading,
  parallaxSubheading,
  parallaxImages[]{
    _key,
    image{
      asset->{_id, url},
      hotspot,
      crop,
      desktopPosition,
      mobilePosition,
      alt
    },
    alt,
    position,
    offset
  },
  performanceSectionHeading,
  performanceImage{
    asset->{_id, url},
    hotspot,
    crop,
    desktopPosition,
    mobilePosition,
    alt
  },
  gallerySectionHeading,
  gallerySectionSubheading,
  galleryImages[]{
    _key,
    image{
      asset->{_id, url},
      hotspot,
      crop,
      desktopPosition,
      mobilePosition,
      alt
    },
    alt,
    width,
    height
  },
  upcomingShowsHeading,
  seeAllShowsLinkText,
  aboutButtonText,
  ctaLessonsButtonText
}`)

// Lessons Page
export const lessonsPageQuery = defineQuery(`*[_type == "lessonsPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  philosophyHeading,
  philosophyText,
  philosophyImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  learningItemsHeading,
  learningItems[]{
    _key,
    title,
    description
  },
  ctaBoxHeading,
  ctaBoxText,
  credentials,
  teachingImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  performanceImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  emailButtonText,
  scheduleButtonText
}`)

// Contact Page
export const contactPageQuery = defineQuery(`*[_type == "contactPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  portraitImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  portraitGallery[]{
    _key,
    image{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
    alt
  },
  formHeading,
  directContactHeading,
  socialHeading,
  quickLinksHeading,
  aboutHeading,
  quickLinkShowsText,
  quickLinkLessonsText,
  quickLinkSetlistText
}`)

// Setlist Page
export const setlistPageQuery = defineQuery(`*[_type == "setlistPage"][0]{
  _id,
  heroHeading,
  heroImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  introText,
  performanceImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  guitarImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  ctaHeading,
  ctaText,
  ctaBookLessonButtonText,
  ctaContactButtonText,
  subtitleSuffix
}`)

// Shows Page
export const showsPageQuery = defineQuery(`*[_type == "showsPage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
  performanceGalleryHeading,
  performanceGallerySubheading,
  performanceImages[]{
    _key,
    image{asset->{_id, url}, hotspot, crop, desktopPosition, mobilePosition, alt},
    alt,
    caption
  },
  upcomingShowsHeading,
  emptyStateHeading,
  emptyStateText,
  showCountPrefix,
  showSingular,
  showPlural
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
    image{asset->, hotspot, crop, alt},
    mobileImage{asset->, hotspot, crop, alt},
    desktopPosition,
    mobilePosition,
    video,
    ctas[]{label, href, variant}
  },
  _type == "richText" => {
    content
  },
  _type == "imageGallery" => {
    images[]{asset->, hotspot, crop, desktopPosition, mobilePosition, alt, caption}
  },
  _type == "featureGrid" => {
    items[]{title, body, iconType, icon, image{asset->, hotspot, crop, desktopPosition, mobilePosition}}
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
  _type,
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
  "slug": slug.current,
  excerpt,
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
  coverImage{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
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
  coverImage{asset->, hotspot, crop, desktopPosition, mobilePosition, alt}
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

// Event detail pages
export const eventBySlugQuery = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
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
  coverImage{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
  heroImage{asset->, hotspot, crop, desktopPosition, alt},
  heroImageMobile{asset->, hotspot, crop, mobilePosition, alt},
  lineup[]{name, role, bio},
  specialNotes,
  isCanceled,
  isSoldOut
}`)

export const eventsSlugs = defineQuery(`*[_type == "event" && defined(slug.current)]{
  "slug": slug.current
}`)

// Products
export const allProductsQuery = defineQuery(`*[_type == "product"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  images[0]{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
  priceCents,
  currency
}`)

export const productBySlugQuery = defineQuery(`*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  description,
  images[]{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
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
  images[0]{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
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
  coverImage{asset->, hotspot, crop, desktopPosition, mobilePosition, alt},
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
