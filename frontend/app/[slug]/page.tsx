import { notFound, redirect } from 'next/navigation'
import { getPageBySlug } from '@/sanity/lib/service'
import { PageBuilder } from '@/app/components/PageBuilder'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params

  // Prevent duplicate content — the homepage lives at / not /home
  if (slug === 'home') {
    redirect('/')
  }

  const page = await getPageBySlug(slug)

  if (!page?.pageBuilder?.length) {
    notFound()
  }

  return <PageBuilder sections={page.pageBuilder} />
}
