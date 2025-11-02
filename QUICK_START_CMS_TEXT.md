# Quick Start: CMS Text Migration

## What's Done ✅

All infrastructure for CMS-managed text is complete:
- ✅ New `uiText` schema with 35+ global text fields
- ✅ All page schemas enhanced with button/link text fields
- ✅ Queries updated to fetch new text data
- ✅ Header, Footer, and ContactForm components refactored to accept CMS data

## What Remains 📝

Update 6 page files to use the CMS data (see detailed instructions in `CMS_TEXT_MIGRATION_GUIDE.md`):

1. `/app/(site)/layout.tsx` - **CRITICAL** - Fetch data and pass to Header/Footer
2. `/app/page.tsx` - Replace 3 button/link texts
3. `/app/(site)/shows/page.tsx` - Replace show count text
4. `/app/(site)/lessons/page.tsx` - Replace 2 button texts
5. `/app/(site)/contact/page.tsx` - Pass props to ContactForm, replace 3 link texts
6. `/app/(site)/setlist/page.tsx` - Replace 3 texts

## Quick Command to Continue

Run this to see the implementation guide:
```bash
cat /Users/johnconnor/Documents/GitHub/Kivett2/CMS_TEXT_MIGRATION_GUIDE.md
```

## Files to Reference

- **Implementation Details:** `CMS_TEXT_MIGRATION_GUIDE.md`
- **Complete Audit:** `HARDCODED_TEXT_AUDIT_SUMMARY.md`
- **This Quick Guide:** `QUICK_START_CMS_TEXT.md`

## Schema Location

All editable text will appear in Sanity Studio under:
- **UI Text & Labels** (singleton) - Global text
- **Home Page** - Home-specific buttons/links
- **Shows Page** - Show count variations
- **Lessons Page** - Lesson CTA buttons
- **Contact Page** - Quick link labels
- **Setlist Page** - Setlist CTA buttons

## After Implementation

1. Open Sanity Studio
2. Navigate to "UI Text & Labels"
3. Fill in or verify all text fields (they have sensible defaults)
4. Do the same for each page singleton
5. Test the frontend to see your changes
