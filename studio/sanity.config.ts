import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { media } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId } from '../frontend/sanity/lib/api'
import { schemaTypes } from './src/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Camlio Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), media()],
  schema: {
    types: schemaTypes,
  },
})
