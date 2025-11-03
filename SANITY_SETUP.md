# Sanity CMS Setup Guide

## Instant Content Updates

Your site is now configured for instant content updates! Here's what was set up:

### 1. On-Demand Revalidation (Instant Updates)

A webhook endpoint has been created at `/api/revalidate` that automatically refreshes your site when content changes in Sanity.

**To enable in Sanity Studio:**

1. Go to your Sanity project dashboard: https://www.sanity.io/manage
2. Select your project (`pydiurzn`)
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure:
   - **Name**: `Production Site Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate` (use your production URL)
     - For local testing: `http://localhost:3000/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Select all (Create, Update, Delete)
   - **HTTP method**: `POST`
   - **HTTP Headers**: Leave default
   - **Secret**: `kivett-revalidate-secret-2025` (matches your `.env.local`)
   - **API version**: `v2021-06-07` or later
   - **Projection**: `{_type, "slug": slug.current}` (optional, helps with specific page revalidation)
6. Click **Save**

**For Vercel deployment**, add this environment variable:
```
SANITY_REVALIDATE_SECRET=kivett-revalidate-secret-2025
```

### 2. Live Preview (Presentation Tool)

Live preview is already configured! Here's how to use it:

**In Sanity Studio:**

1. Open any document (Home Page, Events, Pages, etc.)
2. Look for the **"Presentation"** tab at the top (next to "Content")
3. Click it to see a live preview of your changes
4. Edit content on the left, see instant preview on the right
5. Changes appear in real-time as you type!

**What you can preview:**
- ✅ Home Page (`/`)
- ✅ Pages (`/your-page-slug`)
- ✅ Blog Posts (`/posts/post-slug`)
- ✅ Settings (affects all pages)

**Features:**
- Real-time preview as you edit
- Click elements in the preview to jump to editing them
- Draft mode support (see unpublished changes)

## Content Update Speed

- **Before**: 60-120 seconds delay
- **After**:
  - With webhook: **Instant** (1-2 seconds)
  - With CDN: **Instant** (CDN disabled for fresh data)
  - With live preview: **Real-time** (as you type)

## Troubleshooting

### Webhook not working?
1. Check the webhook logs in Sanity dashboard
2. Verify the secret matches between Sanity and `.env.local`
3. Make sure your site is deployed and accessible
4. Check Next.js logs for any revalidation errors

### Live preview not showing?
1. Make sure you're in the "Presentation" tab in Sanity Studio
2. Check that `NEXT_PUBLIC_BASE_URL` is set correctly in `.env.local`
3. Ensure your dev server is running (`npm run dev`)
4. Clear browser cache and reload

### Still seeing delays?
- Verify `useCdn: false` in `sanity/lib/client.ts`
- Check that `revalidate: 0` is set on pages
- Confirm webhook is hitting `/api/revalidate` endpoint
