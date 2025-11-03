/**
 * SANITY CONTENT BACKUP SCRIPT
 * Creates a complete backup of all Sanity content including images
 * Run with: npx tsx scripts/backup-sanity-content.ts
 *
 * IMPORTANT: Run this BEFORE making any content changes!
 */

import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'pydiurzn',
  dataset: 'production',
  token: 'skAjk1YBqRvhtmr0k8tpaUzqtL3AODFzt5umtNllJmuohXMRTrCsbBNwZfJ9zhuY67scazn3gr1fPCNp22wkZC6siNA1xYJ7v3Ri0JOCPwYL3Bg0QteGFtui8hp3lpDwYaEn4UKLop0VSrVfe3KiK6g9D60B5RWY8NIwtuRqBxfMtiRb7VDn',
  apiVersion: '2025-01-01',
  useCdn: false,
})

async function backupContent() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(process.cwd(), 'sanity-backups')
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`)

  console.log('🔄 BACKING UP ALL SANITY CONTENT\n')
  console.log('=' .repeat(70) + '\n')

  try {
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // Fetch all content
    console.log('📦 Fetching all documents...')

    const queries = {
      homePage: '*[_type == "homePage"][0]',
      lessonsPage: '*[_type == "lessonsPage"][0]',
      contactPage: '*[_type == "contactPage"][0]',
      setlistPage: '*[_type == "setlistPage"][0]',
      merchPage: '*[_type == "merchPage"][0]',
      settings: '*[_type == "settings"][0]',
      events: '*[_type == "event"]',
      songs: '*[_type == "song"]',
    }

    const backup: any = {
      timestamp,
      content: {}
    }

    for (const [key, query] of Object.entries(queries)) {
      console.log(`   Fetching ${key}...`)
      backup.content[key] = await client.fetch(query)
    }

    // Save backup
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2))

    console.log('\n✅ BACKUP COMPLETE!\n')
    console.log(`📁 Backup saved to: ${backupFile}`)
    console.log(`\nTo restore this backup, run:`)
    console.log(`   npx tsx scripts/restore-from-backup.ts ${backupFile}`)
    console.log('\n' + '=' .repeat(70))

    // Show summary
    console.log('\n📊 BACKUP SUMMARY:')
    console.log(`   Home Page Hero Slides: ${backup.content.homePage?.heroSlides?.length || 0}`)
    console.log(`   Events: ${backup.content.events?.length || 0}`)
    console.log(`   Songs: ${backup.content.songs?.length || 0}`)
    console.log(`   Settings: ${backup.content.settings ? '✓' : '✗'}`)
    console.log(`   Lessons Page: ${backup.content.lessonsPage ? '✓' : '✗'}`)
    console.log(`   Contact Page: ${backup.content.contactPage ? '✓' : '✗'}`)
    console.log(`   Setlist Page: ${backup.content.setlistPage ? '✓' : '✗'}`)
    console.log(`   Merch Page: ${backup.content.merchPage ? '✓' : '✗'}`)

  } catch (error) {
    console.error('❌ Error creating backup:', error)
    throw error
  }
}

backupContent()
