#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import {createClient} from 'next-sanity'
import {projectId, dataset, apiVersion} from '../sanity/lib/api.js'

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN or SANITY_API_READ_TOKEN')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false})

async function uploadImage(localPath) {
  const abs = path.resolve(process.cwd(), localPath)
  const data = fs.readFileSync(abs)
  const res = await client.assets.upload('image', data, {filename: path.basename(localPath)})
  return {_type: 'image', asset: {_type: 'reference', _ref: res._id}}
}

async function run() {
  console.log('Seeding example products...')
  // Upload images
  const img1 = await uploadImage('hero-final-test.png').catch(() => null)
  const img2 = await uploadImage('hero-white-text.png').catch(() => null)

  const now = new Date().toISOString()
  const docs = [
    {
      _type: 'product',
      title: 'KB Logo Tee',
      slug: {current: 'kb-logo-tee'},
      description: [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Soft unisex tee with Kivett Bednar logo.'}]}],
      images: img1 ? [img1] : [],
      priceCents: 2500,
      currency: 'USD',
      options: [
        {name: 'Size', values: ['S', 'M', 'L', 'XL']},
        {name: 'Color', values: ['Black', 'White']},
      ],
      gelatoProductUid: 'apparel_unisex_basic_softstyle_tshirt',
      printAreas: [
        {areaName: 'front', artwork: img2 || img1},
      ],
      createdAt: now,
    },
    {
      _type: 'product',
      title: 'Blues Poster',
      slug: {current: 'blues-poster'},
      description: [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'High-quality poster featuring blues artwork.'}]}],
      images: img2 ? [img2] : [],
      priceCents: 1800,
      currency: 'USD',
      options: [{name: 'Size', values: ['12x18 in', '18x24 in']}],
      gelatoProductUid: 'poster_vertical_12x18_in',
      printAreas: [
        {areaName: 'front', artwork: img2 || img1},
      ],
      createdAt: now,
    },
  ]

  for (const doc of docs) {
    try {
      const exists = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{_id}`, {slug: doc.slug.current})
      if (exists?._id) {
        await client.patch(exists._id).set(doc).commit()
        console.log('Updated', doc.title)
      } else {
        await client.create(doc)
        console.log('Created', doc.title)
      }
    } catch (e) {
      console.error('Failed for', doc.title, e.message)
    }
  }

  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

