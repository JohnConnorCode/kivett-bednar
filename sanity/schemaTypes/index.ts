import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {event} from './documents/event'
import {product} from './documents/product'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {navigation} from './singletons/navigation'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'

// Module objects
import {hero} from './objects/modules/hero'
import {richText} from './objects/modules/richText'
import {imageGallery} from './objects/modules/imageGallery'
import {featureGrid} from './objects/modules/featureGrid'
import {ctaBanner} from './objects/modules/ctaBanner'
import {videoEmbed} from './objects/modules/videoEmbed'
import {musicEmbed} from './objects/modules/musicEmbed'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  navigation,
  // Documents
  page,
  post,
  person,
  event,
  product,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  // Module objects
  hero,
  richText,
  imageGallery,
  featureGrid,
  ctaBanner,
  videoEmbed,
  musicEmbed,
]
