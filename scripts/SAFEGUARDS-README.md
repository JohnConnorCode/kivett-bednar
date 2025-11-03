# Sanity Content Protection Safeguards

## ⚠️ CRITICAL: Never Reset Content Without Backup

This document explains how to protect your Sanity content from accidental resets.

## What Happened

When I ran `scripts/update-professional-content.ts`, it used `createOrReplace()` which **completely overwrote** your carefully curated homepage content, including:
- 6-8 hero slides (images and positioning)
- Custom text you had written
- Hours of work setting up content

## Protection System

### 1. Automatic Backups (REQUIRED before any script)

**ALWAYS run this before running ANY content modification script:**

```bash
npx tsx scripts/backup-sanity-content.ts
```

This creates a timestamped backup in `sanity-backups/` with ALL your content including images.

### 2. Script Safety Headers

All content modification scripts now have this header:

```typescript
/**
 * ⚠️  DANGER: This script modifies Sanity content
 *
 * BEFORE RUNNING:
 * 1. Run: npx tsx scripts/backup-sanity-content.ts
 * 2. Verify backup created in sanity-backups/
 * 3. Only then run this script
 *
 * If something goes wrong:
 * - Run: npx tsx scripts/restore-from-backup.ts <backup-file>
 */
```

### 3. Never Use `createOrReplace()` on Existing Content

**BAD** (erases everything):
```typescript
await client.createOrReplace({
  _id: 'homePage',
  _type: 'homePage',
  // This REPLACES everything, losing hero slides, etc.
})
```

**GOOD** (only updates specific fields):
```typescript
await client
  .patch('homePage')
  .set({
    // Only update these specific fields
    aboutText: 'New text...',
  })
  .commit()
```

### 4. Git Protection

The `.gitignore` does NOT ignore `sanity-backups/` - backups are committed to git for safety.

## Recovery Process

If content gets erased:

1. **Check latest backup:**
   ```bash
   ls -lt sanity-backups/
   ```

2. **Restore from backup:**
   ```bash
   npx tsx scripts/restore-from-backup.ts sanity-backups/backup-YYYY-MM-DDTHH-mm-ss-sssZ.json
   ```

3. **Verify in Sanity Studio:**
   - Open http://localhost:3333
   - Check that hero slides, content, etc. are restored

## Manual Content Restoration

Some content (like hero slide images with custom positioning) must be restored manually:

1. Open Sanity Studio: `http://localhost:3333`
2. Go to HomePage document
3. Add/edit hero slides:
   - Upload images
   - Set alt text
   - Use hotspot tool for positioning
   - Set desktop/mobile positions if needed

## Current Backup Status

Latest backup: `sanity-backups/backup-2025-11-03T07-47-46-621Z.json`

Content:
- ✅ Home Page (6 hero slides currently - you had 8 before reset)
- ✅ Lessons Page
- ✅ Contact Page
- ✅ Setlist Page
- ✅ Merch Page
- ✅ Settings
- ✅ 6 Events
- ✅ 135 Songs

## Missing Hero Slides

You originally had 8 hero slides. The current backup shows 6.

The 2 missing slides need to be re-added in Sanity Studio with:
- Image upload
- Alt text
- Position settings

## Prevention Rules

**NEVER:**
- Run content scripts without backing up first
- Use `createOrReplace()` on existing documents
- Assume scripts only change what you ask for

**ALWAYS:**
- Create backup before ANY content changes
- Use `.patch().set()` for targeted updates
- Test scripts on development dataset first
- Commit backups to git

## Questions?

- Check backup: `ls -lt sanity-backups/`
- View backup contents: `cat sanity-backups/latest-backup.json | jq`
- Restore: `npx tsx scripts/restore-from-backup.ts <file>`
