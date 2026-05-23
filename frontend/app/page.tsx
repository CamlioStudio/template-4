// Homepage — Camlio Wedding Planner Agency
// Matches Figma: https://www.figma.com/design/apkoUE0qf0DnlMktY1SnFi

import { getHomePage } from '@/sanity/lib/service'
import { PageBuilder } from '@/app/components/PageBuilder'

export default async function HomePage() {
  const page = await getHomePage()

  if (!page?.pageBuilder?.length) {
    return null
  }

  return <PageBuilder sections={page.pageBuilder} />
}

