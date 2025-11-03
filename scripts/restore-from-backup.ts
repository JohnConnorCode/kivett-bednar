/**
 * RESTORE FROM BACKUP
 * Restores all Sanity content from a backup file
 * Usage: npx tsx scripts/restore-from-backup.ts <backup-file-path>
 * Example: npx tsx scripts/restore-from-backup.ts sanity-backups/backup-2025-11-03T07-47-46-621Z.json
 */

import {createClient} from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function restoreFromBackup(backupPath: string) {
  console.log('🔄 RESTORING FROM BACKUP\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // Read backup file
    if (!fs.existsSync(backupPath)) {
      console.error(`❌ Backup file not found: ${backupPath}`)
      console.log('\nAvailable backups:')
      const backups = fs.readdirSync('sanity-backups').filter(f => f.endsWith('.json'))
      backups.forEach(b => console.log(`   - sanity-backups/${b}`))
      process.exit(1)
    }

    console.log(`📁 Reading backup file: ${backupPath}`)
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'))

    console.log(`   Backup timestamp: ${backupData.timestamp}`)
    console.log(`   Content sections: ${Object.keys(backupData.content).length}\n`)

    // Restore each content type
    const { content } = backupData

    // Restore single documents (pages)
    for (const [docType, docData] of Object.entries(content)) {
      if (!docData || Array.isArray(docData)) continue

      const doc = docData as any
      if (!doc._id) continue

      console.log(`   Restoring ${docType}...`)

      try {
        await client.createOrReplace(doc)
        console.log(`      ✓ ${docType} restored`)
      } catch (error: any) {
        console.error(`      ✗ Error restoring ${docType}:`, error.message)
      }
    }

    // Restore events (array of documents)
    if (content.events && Array.isArray(content.events)) {
      console.log(`\n   Restoring ${content.events.length} events...`)
      for (const event of content.events) {
        try {
          await client.createOrReplace(event)
        } catch (error: any) {
          console.error(`      ✗ Error restoring event ${event._id}:`, error.message)
        }
      }
      console.log(`      ✓ Events restored`)
    }

    // Restore songs (array of documents)
    if (content.songs && Array.isArray(content.songs)) {
      console.log(`   Restoring ${content.songs.length} songs...`)
      let restored = 0
      for (const song of content.songs) {
        try {
          await client.createOrReplace(song)
          restored++
        } catch (error: any) {
          console.error(`      ✗ Error restoring song ${song._id}:`, error.message)
        }
      }
      console.log(`      ✓ ${restored}/${content.songs.length} songs restored`)
    }

    console.log('\n✅ RESTORE COMPLETE!\n')
    console.log('=' .repeat(70))

    // Show summary
    console.log('\n📊 RESTORE SUMMARY:')
    console.log(`   Home Page: ${content.homePage ? '✓' : '✗'}`)
    console.log(`   Lessons Page: ${content.lessonsPage ? '✓' : '✗'}`)
    console.log(`   Contact Page: ${content.contactPage ? '✓' : '✗'}`)
    console.log(`   Setlist Page: ${content.setlistPage ? '✓' : '✗'}`)
    console.log(`   Merch Page: ${content.merchPage ? '✓' : '✗'}`)
    console.log(`   Settings: ${content.settings ? '✓' : '✗'}`)
    console.log(`   Events: ${content.events?.length || 0}`)
    console.log(`   Songs: ${content.songs?.length || 0}`)

    if (content.homePage?.heroSlides) {
      console.log(`\n   Hero Slides Restored: ${content.homePage.heroSlides.length}`)
    }

    console.log('\n⚠️  Next Steps:')
    console.log('   1. Check Sanity Studio to verify content: http://localhost:3333')
    console.log('   2. If hero slides are missing, add them manually in Studio')
    console.log('   3. Deploy to production: vercel --prod')

  } catch (error) {
    console.error('❌ Error restoring backup:', error)
    throw error
  }
}

const backupPath = process.argv[2]

if (!backupPath) {
  console.error('❌ Usage: npx tsx scripts/restore-from-backup.ts <backup-file-path>')
  console.log('\nExample:')
  console.log('   npx tsx scripts/restore-from-backup.ts sanity-backups/backup-2025-11-03T07-47-46-621Z.json')
  console.log('\nAvailable backups:')
  try {
    const backups = fs.readdirSync('sanity-backups').filter(f => f.endsWith('.json'))
    backups.forEach(b => console.log(`   - sanity-backups/${b}`))
  } catch (e) {
    console.log('   (No backups found)')
  }
  process.exit(1)
}

restoreFromBackup(backupPath)
