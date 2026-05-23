import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { media } from 'sanity-plugin-media'
import { MenuIcon, LinkedinIcon, CogIcon } from '@sanity/icons'
import { apiVersion, dataset, projectId } from '../frontend/sanity/lib/api'
import { schemaTypes } from './src/schemaTypes'

const SINGLETONS = [
  { id: 'siteHeader', title: 'Header', icon: MenuIcon },
  { id: 'siteFooter', title: 'Footer', icon: LinkedinIcon },
  { id: 'siteSettings', title: 'Settings', icon: CogIcon },
]
const SINGLETON_IDS = new Set(SINGLETONS.map((s) => s.id))

export default defineConfig({
  name: 'default',
  title: 'Camlio Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton items — fixed document IDs, no "create new"
            ...SINGLETONS.map(({ id, title, icon }) =>
              S.listItem()
                .title(title)
                .icon(icon)
                .id(id)
                .child(S.document().schemaType(id).documentId(id).title(title))
            ),
            S.divider(),
            // All other document types (pages, etc.)
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_IDS.has(item.getId() ?? '')
            ),
          ]),
    }),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
})
