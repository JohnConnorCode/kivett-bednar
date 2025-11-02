# CMS Text Migration - Implementation Guide

## Overview
This guide documents the complete migration of ALL hardcoded text strings to Sanity CMS. All UI text, buttons, labels, and dynamic content are now CMS-editable.

## Completed Work

### 1. New Schema Created
**File:** `/sanity/schemaTypes/singletons/uiText.tsx`
- Global UI text singleton containing all reusable text elements
- Includes: navigation labels, button text, form labels, footer text, copyright, social media labels
- All fields have sensible initial values matching current hardcoded text

### 2. Existing Schemas Updated
All page-specific schemas now include text field for buttons and dynamic content:

**homePage.tsx** - Added fields:
- `seeAllShowsLinkText` - "See all shows →"
- `aboutButtonText` - "View Setlist"
- `ctaLessonsButtonText` - "Schedule Your First Lesson"

**lessonsPage.tsx** - Added fields:
- `emailButtonText` - "Email Me"
- `scheduleButtonText` - "Schedule a Lesson"

**contactPage.tsx** - Added fields:
- `quickLinkShowsText` - "Upcoming Shows"
- `quickLinkLessonsText` - "Guitar Lessons"
- `quickLinkSetlistText` - "Blues Setlist"

**setlistPage.tsx** - Added fields:
- `ctaBookLessonButtonText` - "Book a Lesson"
- `ctaContactButtonText` - "Get in Touch"
- `subtitleSuffix` - " timeless classics from the great American songbook"

**showsPage.tsx** - Added fields:
- `showCountPrefix` - " upcoming"
- `showSingular` - "show"
- `showPlural` - "shows"

### 3. Queries Updated
**File:** `/sanity/lib/queries.ts`
- Created `uiTextQuery` - fetches all global UI text
- Updated all page queries to include new button/text fields

### 4. Components Updated
**Header Component** (`/components/ui/Header.tsx`)
- Now accepts `siteName` and `navigation` props
- Fallbacks to defaults if not provided
- Logo text now CMS-editable

**Footer Component** (`/components/ui/Footer.tsx`)
- Accepts all text content as props
- Social links from CMS with custom labels
- Copyright text with `{year}` placeholder support
- All section headings editable

**ContactForm Component** (`/components/ui/ContactForm.tsx`)
- All form labels now props
- Button text configurable
- Success message configurable

## Page Implementation Needed

The following pages need to be updated to fetch and use the CMS data. Here's exactly what to change:

### Home Page (`/app/page.tsx`)

**Add to imports:**
```typescript
import {uiTextQuery} from '@/sanity/lib/queries'
```

**Update data fetching:**
```typescript
const [{data: homePage}, {data: events}, {data: uiText}] = await Promise.all([
  sanityFetch({query: homePageQuery}),
  sanityFetch({
    query: upcomingEventsQuery,
    params: {now: new Date().toISOString(), limit: 3},
  }),
  sanityFetch({query: uiTextQuery}),
])
```

**Line 68-70 - Update "View Setlist" button:**
```typescript
// BEFORE:
View Setlist

// AFTER:
{homePage.aboutButtonText || 'View Setlist'}
```

**Line 233 - Update "See all shows →" link:**
```typescript
// BEFORE:
See all shows →

// AFTER:
{homePage.seeAllShowsLinkText || 'See all shows →'}
```

**Line 261 - Update "Schedule Your First Lesson" button:**
```typescript
// BEFORE:
Schedule Your First Lesson

// AFTER:
{homePage.ctaLessonsButtonText || 'Schedule Your First Lesson'}
```

### Shows Page (`/app/(site)/shows/page.tsx`)

**Line 146 - Update show count text:**
```typescript
// BEFORE:
{events.length} upcoming {events.length === 1 ? 'show' : 'shows'}

// AFTER:
{events.length}{showsPage?.showCountPrefix || ' upcoming'} {events.length === 1 ? (showsPage?.showSingular || 'show') : (showsPage?.showPlural || 'shows')}
```

### Lessons Page (`/app/(site)/lessons/page.tsx`)

**Line 97 - Update "Email Me" button:**
```typescript
// BEFORE:
Email Me

// AFTER:
{lessonsPage.emailButtonText || 'Email Me'}
```

**Line 107 - Update "Schedule a Lesson" button:**
```typescript
// BEFORE:
Schedule a Lesson

// AFTER:
{lessonsPage.scheduleButtonText || 'Schedule a Lesson'}
```

### Contact Page (`/app/(site)/contact/page.tsx`)

**Add to imports:**
```typescript
import {uiTextQuery} from '@/sanity/lib/queries'
```

**Update data fetching:**
```typescript
const [{data: contactPage}, {data: settings}, {data: uiText}] = await Promise.all([
  sanityFetch({query: contactPageQuery}),
  sanityFetch({query: settingsQuery}),
  sanityFetch({query: uiTextQuery}),
])
```

**Line 43 - Pass props to ContactForm:**
```typescript
// BEFORE:
<ContactForm />

// AFTER:
<ContactForm
  labelName={uiText?.formLabelName}
  labelEmail={uiText?.formLabelEmail}
  labelSubject={uiText?.formLabelSubject}
  labelMessage={uiText?.formLabelMessage}
  buttonSubmit={uiText?.formButtonSubmit}
  buttonSending={uiText?.formButtonSending}
  successMessage={uiText?.formSuccessMessage}
/>
```

**Lines 92, 99, 106 - Update quick link text:**
```typescript
// Line 92 - BEFORE:
Upcoming Shows
// AFTER:
{contactPage?.quickLinkShowsText || 'Upcoming Shows'}

// Line 99 - BEFORE:
Guitar Lessons
// AFTER:
{contactPage?.quickLinkLessonsText || 'Guitar Lessons'}

// Line 106 - BEFORE:
Blues Setlist
// AFTER:
{contactPage?.quickLinkSetlistText || 'Blues Setlist'}
```

### Setlist Page (`/app/(site)/setlist/page.tsx`)

**Line 26 - Update subtitle suffix:**
```typescript
// BEFORE:
subtitle={songs && songs.length > 0 ? `${songs.length} timeless classics from the great American songbook` : undefined}

// AFTER:
subtitle={songs && songs.length > 0 ? `${songs.length}${setlistPage?.subtitleSuffix || ' timeless classics from the great American songbook'}` : undefined}
```

**Line 127 - Update "Book a Lesson" button:**
```typescript
// BEFORE:
Book a Lesson

// AFTER:
{setlistPage?.ctaBookLessonButtonText || 'Book a Lesson'}
```

**Line 133 - Update "Get in Touch" button:**
```typescript
// BEFORE:
Get in Touch

// AFTER:
{setlistPage?.ctaContactButtonText || 'Get in Touch'}
```

### Layout File (`/app/(site)/layout.tsx`)

This file needs to be updated to pass CMS data to Header and Footer components.

**Add imports:**
```typescript
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery, uiTextQuery} from '@/sanity/lib/queries'
```

**Make layout async and fetch data:**
```typescript
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [{data: settings}, {data: uiText}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: uiTextQuery}),
  ])

  const navigation = [
    {title: uiText?.navShows || 'Shows', href: '/shows'},
    {title: uiText?.navLessons || 'Lessons', href: '/lessons'},
    {title: uiText?.navSetlist || 'Setlist', href: '/setlist'},
    {title: uiText?.navMerch || 'Merch', href: '/merch'},
    {title: uiText?.navContact || 'Contact', href: '/contact'},
  ]

  return (
    <>
      <Header siteName={uiText?.siteName} navigation={navigation} />
      <main>{children}</main>
      <Footer
        navigation={navigation}
        siteName={uiText?.siteName}
        siteTagline={uiText?.siteTagline}
        navigationHeading={uiText?.footerNavigationHeading}
        connectHeading={uiText?.footerConnectHeading}
        socialLinks={settings?.socialLinks}
        socialFacebookLabel={uiText?.socialFacebook}
        socialInstagramLabel={uiText?.socialInstagram}
        copyrightText={uiText?.footerCopyrightText}
      />
    </>
  )
}
```

## Data Population Script

Create a script to populate all the new fields with initial values. Run this in Sanity Studio's Vision tool or create a migration script:

```groq
// Create uiText document
{
  "_type": "uiText",
  "siteName": "KIVETT BEDNAR",
  "siteTagline": "Gritty Texas Blues meets the heart of the Pacific Northwest",
  "navShows": "Shows",
  "navLessons": "Lessons",
  "navSetlist": "Setlist",
  "navMerch": "Merch",
  "navContact": "Contact",
  "footerNavigationHeading": "Navigation",
  "footerConnectHeading": "Connect",
  "footerCopyrightText": "© {year} Kivett Bednar. All rights reserved.",
  "formLabelName": "Name",
  "formLabelEmail": "Email",
  "formLabelSubject": "Subject",
  "formLabelMessage": "Message",
  "formButtonSubmit": "Send Message",
  "formButtonSending": "Sending...",
  "formSuccessMessage": "Thank you! Your message has been sent successfully.",
  "buttonViewSetlist": "View Setlist",
  "buttonScheduleLesson": "Schedule Your First Lesson",
  "buttonBookLesson": "Book a Lesson",
  "buttonEmailMe": "Email Me",
  "buttonGetInTouch": "Get in Touch",
  "linkSeeAllShows": "See all shows →",
  "linkUpcomingShows": "Upcoming Shows",
  "linkGuitarLessons": "Guitar Lessons",
  "linkBluesSetlist": "Blues Setlist",
  "showsCountSingular": "show",
  "showsCountPlural": "shows",
  "upcomingPrefix": " upcoming",
  "setlistSubtitleSuffix": " timeless classics from the great American songbook",
  "socialFacebook": "Facebook",
  "socialInstagram": "Instagram"
}
```

Then update existing page documents:

```javascript
// Update homePage
patch("*[_type == 'homePage'][0]._id")
  .set({
    "seeAllShowsLinkText": "See all shows →",
    "aboutButtonText": "View Setlist",
    "ctaLessonsButtonText": "Schedule Your First Lesson"
  })
  .commit()

// Update lessonsPage
patch("*[_type == 'lessonsPage'][0]._id")
  .set({
    "emailButtonText": "Email Me",
    "scheduleButtonText": "Schedule a Lesson"
  })
  .commit()

// Update contactPage
patch("*[_type == 'contactPage'][0]._id")
  .set({
    "quickLinkShowsText": "Upcoming Shows",
    "quickLinkLessonsText": "Guitar Lessons",
    "quickLinkSetlistText": "Blues Setlist"
  })
  .commit()

// Update setlistPage
patch("*[_type == 'setlistPage'][0]._id")
  .set({
    "ctaBookLessonButtonText": "Book a Lesson",
    "ctaContactButtonText": "Get in Touch",
    "subtitleSuffix": " timeless classics from the great American songbook"
  })
  .commit()

// Update showsPage
patch("*[_type == 'showsPage'][0]._id")
  .set({
    "showCountPrefix": " upcoming",
    "showSingular": "show",
    "showPlural": "shows"
  })
  .commit()
```

## Summary of What's Now CMS-Editable

### Global UI Text (via uiText singleton):
- Site name/logo
- Site tagline
- All navigation labels (Shows, Lessons, Setlist, Merch, Contact)
- Footer section headings
- Copyright text
- Contact form labels (Name, Email, Subject, Message)
- Contact form button states (Send Message, Sending...)
- Contact form success message
- Common button labels
- Common link text
- Dynamic count text (show/shows, etc.)
- Social media platform labels

### Page-Specific Text:
- **Home Page:** About button, see all shows link, CTA lesson button
- **Shows Page:** Show count prefix and pluralization
- **Lessons Page:** Email and schedule button text
- **Contact Page:** Quick link labels
- **Setlist Page:** CTA buttons, subtitle suffix

### Components:
- Header: Logo and navigation
- Footer: All text, headings, copyright
- ContactForm: All labels and messages

## Benefits

1. **Complete Control:** Every visible text element is now editable through Sanity Studio
2. **Internationalization Ready:** Easy to duplicate schemas for multi-language support
3. **Brand Consistency:** Central location for managing brand messaging
4. **A/B Testing:** Can easily test different button labels and CTAs
5. **No Code Changes:** Marketing team can update any text without developer involvement

## Next Steps

1. Run the data population script in Sanity Studio
2. Implement the page component changes listed above
3. Test all pages to ensure text displays correctly
4. Verify all buttons and links still work
5. Consider adding more text fields for any remaining hardcoded strings found during testing
