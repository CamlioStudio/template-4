#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const blockName = process.argv[2]

if (!blockName) {
  console.error('Usage: node create-block.js <PascalCaseName>')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(blockName)) {
  console.error('Block name must be PascalCase with no spaces or hyphens.')
  process.exit(1)
}

const camelName = blockName.charAt(0).toLowerCase() + blockName.slice(1)
const schemaDir = path.join(root, 'studio', 'src', 'schemaTypes', 'objects', blockName)
const componentDir = path.join(root, 'frontend', 'app', 'components', 'blocks', blockName)

fs.mkdirSync(schemaDir, { recursive: true })
fs.mkdirSync(componentDir, { recursive: true })

const schemaFile = path.join(schemaDir, 'index.ts')
const componentFile = path.join(componentDir, 'index.tsx')

if (!fs.existsSync(schemaFile)) {
  fs.writeFileSync(
    schemaFile,
    `import { defineField, defineType } from 'sanity'\nimport { DocumentIcon } from '@sanity/icons'\n\nexport const ${camelName} = defineType({\n  name: '${camelName}',\n  title: '${blockName}',\n  type: 'object',\n  icon: DocumentIcon,\n  fields: [\n    defineField({ name: 'cmsTitle', title: 'CMS Title', type: 'string' }),\n  ],\n})\n`,
  )
}

if (!fs.existsSync(componentFile)) {
  fs.writeFileSync(
    componentFile,
    `import type { ${blockName} } from '@/sanity.types'\n\ntype ${blockName}Props = {\n  block: ${blockName}\n  index: number\n}\n\nexport default function ${blockName}Block({ block }: ${blockName}Props) {\n  return <section>{block.cmsTitle ?? '${blockName}'}</section>\n}\n`,
  )
}

const importSchemaTypePath = path.join(root, 'studio', 'src', 'schemaTypes', 'importSchemaType.ts')
const importPageBuilderTypesPath = path.join(root, 'studio', 'src', 'schemaTypes', 'objects', 'importPageBuilderTypes.ts')

if (fs.existsSync(importSchemaTypePath)) {
  const current = fs.readFileSync(importSchemaTypePath, 'utf8')
  const importLine = `import { ${camelName} } from './objects/${blockName}'`
  const exportLine = `  ${camelName},`

  if (!current.includes(importLine)) {
    const next = `${importLine}\n${current}`
    fs.writeFileSync(importSchemaTypePath, next)
  }

  const withExport = fs.readFileSync(importSchemaTypePath, 'utf8')
  if (!withExport.includes(exportLine) && withExport.includes('export const importSchemaTypes = [')) {
    fs.writeFileSync(importSchemaTypePath, withExport.replace('export const importSchemaTypes = [', `export const importSchemaTypes = [\n  ${camelName},`))
  }
}

if (fs.existsSync(importPageBuilderTypesPath)) {
  const current = fs.readFileSync(importPageBuilderTypesPath, 'utf8')
  const entry = `{ type: '${camelName}' }`
  if (!current.includes(entry)) {
    const next = current.replace('[{', `[\n  { type: '${camelName}' },\n  {`) // best effort for the starter
    fs.writeFileSync(importPageBuilderTypesPath, next)
  }
}

console.log(`Created block scaffold for ${blockName}`)
