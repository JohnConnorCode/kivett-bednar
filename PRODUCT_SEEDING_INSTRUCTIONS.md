# Product Seeding Instructions

## Current Status

The codebase has been updated so that **ALL products must be stored in Sanity CMS**. There are no hardcoded products anymore.

## What Was Changed

1. **Removed hardcoded products** from:
   - `app/(site)/merch/page.tsx` - Now fetches only from Sanity
   - `app/api/products/route.ts` - Now returns only Sanity products

2. **Created seed script** (`scripts/seed-products.mjs`) with 8 demo products

3. **Fixed cart drawer** mobile overflow/responsiveness issues

## ⚠️ Important: Sanity Credentials Required

Your `.env.local` currently has **placeholder Sanity credentials**. To seed products, you need:

```bash
# Real Sanity project credentials
NEXT_PUBLIC_SANITY_PROJECT_ID="your-real-project-id"  # Currently: placeholder-project-id
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_WRITE_TOKEN="your-write-token"  # Required for seeding
```

## How to Seed Products

Once you have real Sanity credentials configured:

```bash
npm run seed:products
```

This will create **8 demo products** in your Sanity CMS:

1. **Blues Legend T-Shirt** - $29.99 (on sale, bestseller, featured)
2. **Signature Guitar Pick Set** - $12.99 (limited edition, featured)
3. **Live Blues Album Vinyl** - $34.99 (new, featured)
4. **Vintage Blues Hoodie** - $54.99 (on sale from $69.99)
5. **Concert Poster Print** - $19.99
6. **Blues Master Baseball Cap** - $27.99
7. **Acoustic Sessions CD** - $14.99
8. **Tour 2025 Long Sleeve** - $39.99 (tour exclusive)

### Product Features

All demo products include:
- ✅ High-quality images from Unsplash (uploaded to Sanity)
- ✅ Proper categories (apparel, music, accessories, prints)
- ✅ Inventory tracking enabled
- ✅ Product options (sizes, colors where applicable)
- ✅ Featured/badge flags
- ✅ Sale pricing
- ✅ Stock quantities

## Getting Sanity Credentials

### Option 1: Use Existing Sanity Project
If you already have a Sanity project:
1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Create a token with "Editor" permissions
5. Update `.env.local` with the token

### Option 2: Create New Sanity Project
```bash
npm install -g @sanity/cli
sanity login
sanity init
# Follow prompts to create project
# Copy project ID and create API token
```

## Managing Products After Seeding

After seeding, you can manage products through Sanity Studio:
- Local: `http://localhost:3000/studio`
- Production: `https://your-domain.com/studio`

You can:
- Edit product details, prices, descriptions
- Upload real product images
- Adjust inventory levels
- Add new products
- Delete or archive products
- Reorder products by changing "featured" status

## Current Behavior (Without Setup)

Until Sanity is configured and products are seeded:
- ✅ Site builds successfully
- ✅ Cart drawer works and is responsive
- ❌ Merch page shows "Store Opening Soon" empty state
- ❌ No products display

## Why This Approach?

All content is managed in Sanity CMS so you can:
- ✨ Update products without deploying code
- 🖼️ Upload real product images through UI
- 📊 Track inventory in real-time
- 💰 Adjust pricing dynamically
- 🚀 Use Sanity's content delivery CDN
- 📱 Manage content from anywhere

## Questions?

- Sanity docs: https://sanity.io/docs
- Sanity support: https://sanity.io/help
