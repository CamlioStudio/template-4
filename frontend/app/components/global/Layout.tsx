import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { getSiteHeader, getSiteFooter } from '@/sanity/lib/service'

type LayoutProps = {
  children: ReactNode
}

export async function Layout({ children }: LayoutProps) {
  const [header, footer] = await Promise.all([getSiteHeader(), getSiteFooter()])

  return (
    <>
      <Header
        navLeft={header?.navLeft}
        navRight={header?.navRight}
        rsvpLabel={header?.rsvpLabel}
        rsvpHref={header?.rsvpHref}
      />
      {children}
      <Footer
        navItems={footer?.navItems}
        brandName={footer?.brandName}
        brandYear={footer?.brandYear}
        facebookUrl={footer?.facebookUrl}
        instagramUrl={footer?.instagramUrl}
        xUrl={footer?.xUrl}
        copyrightText={footer?.copyrightText}
      />
    </>
  )
}
