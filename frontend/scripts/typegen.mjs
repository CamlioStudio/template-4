import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const outputPath = resolve(process.cwd(), 'sanity.types.ts')

const content = `export type ContactUs = {
  _type: 'contactUs'
  cmsTitle?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  ceremonyTitle?: string
  ceremonyDate?: string
  ceremonyTime?: string
  ceremonyLocation?: string
  receptionTitle?: string
  receptionDate?: string
  receptionTime?: string
  receptionLocation?: string
}

export type PageBuilderSection = ContactUs

export type Page = {
  _type: 'page'
  title?: string
  slug?: {
    current?: string
  }
  pageBuilder?: PageBuilderSection[]
}
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, content)
