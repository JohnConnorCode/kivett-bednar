import {
  CogIcon,
  HomeIcon,
  BookIcon,
  EnvelopeIcon,
  DocumentIcon,
  ComponentIcon,
  UserIcon,
} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

// Singleton document types that should not appear in the document list
const SINGLETON_TYPES = [
  'settings',
  'homePage',
  'lessonsPage',
  'contactPage',
  'setlistPage',
  'navigation',
  'assist.instruction.context',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // === SINGLETON PAGES ===
      // These pages have only one instance each and should be edited directly

      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage'))
        .icon(HomeIcon),

      S.listItem()
        .title('Lessons Page')
        .id('lessonsPage')
        .child(S.document().schemaType('lessonsPage').documentId('lessonsPage'))
        .icon(BookIcon),

      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage'))
        .icon(EnvelopeIcon),

      S.listItem()
        .title('Setlist Page')
        .id('setlistPage')
        .child(S.document().schemaType('setlistPage').documentId('setlistPage'))
        .icon(DocumentIcon),

      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation'))
        .icon(ComponentIcon),

      S.divider(),

      // === DOCUMENT TYPES ===
      // These content types can have multiple instances (Events, Pages, Products, Songs, etc.)

      ...S.documentTypeListItems()
        // Filter out singleton types and system types
        .filter((listItem: any) => !SINGLETON_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),

      S.divider(),

      // === SETTINGS ===

      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
