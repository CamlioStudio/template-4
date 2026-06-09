import { Container } from '@/app/components/Container'

type NavItem = { label: string; href: string }

type FooterProps = {
  navItems?: NavItem[]
  brandName?: string
  brandYear?: string
  facebookUrl?: string | null
  instagramUrl?: string | null
  xUrl?: string | null
  copyrightText?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home',      href: '/'          },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Gallery',   href: '/gallery'   },
  { label: 'RSVP',      href: '/rsvp'      },
]

function FacebookIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <rect width="42" height="42" rx="4" fill="#edcf93" />
      <path d="M23.5 22h2.5l1-4h-3.5v-2c0-1.03.4-2 1.5-2H27v-3.5s-1.1-.5-2.5-.5c-3.28 0-5 2.02-5 5v3h-3v4h3v10h4V22z" fill="#171717" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="41" height="41" rx="20.5" stroke="#171717" strokeOpacity="0.2" />
      <path d="M21 13c-2.173 0-2.445.01-3.298.048-2.268.104-3.525 1.363-3.629 3.63C14.01 17.53 14 17.8 14 21c0 3.2.01 3.47.073 4.322.104 2.265 1.358 3.525 3.63 3.63C18.554 28.99 18.826 29 21 29c3.2 0 3.47-.01 4.322-.048 2.266-.104 3.527-1.362 3.63-3.63C28.99 24.47 29 24.2 29 21c0-3.2-.01-3.47-.048-4.322-.104-2.268-1.365-3.527-3.63-3.63C24.47 13.01 24.2 13 21 13zm0 1.44c2.136 0 2.389.008 3.232.046 1.9.087 2.79.99 2.877 2.877.038.843.046 1.096.046 3.232 0 2.137-.009 2.39-.046 3.231-.087 1.886-.975 2.79-2.877 2.877-.843.038-1.094.046-3.232.046-2.136 0-2.389-.008-3.232-.046-1.904-.087-2.79-.993-2.877-2.877C14.853 23.39 14.845 23.137 14.845 21c0-2.136.009-2.389.046-3.232.087-1.888.975-2.79 2.877-2.877C18.612 14.853 18.864 14.44 21 14.44zm0 2.453a4.107 4.107 0 1 0 0 8.214 4.107 4.107 0 0 0 0-8.214zm0 6.773a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333zm5.23-6.938a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z" fill="#171717" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="41" height="41" rx="20.5" stroke="#171717" strokeOpacity="0.2" />
      <path d="M23.162 19.862 28.44 14h-1.255l-4.588 5.326L18.863 14H14.5l5.536 8.053L14.5 28.5h1.255l4.84-5.624 3.866 5.624H28.5l-5.338-8.638zm-1.714 1.99-.56-.803-4.467-6.39h1.921l3.601 5.152.56.801 4.684 6.705h-1.921l-3.818-5.465z" fill="#171717" />
    </svg>
  )
}

export function Footer({
  navItems = DEFAULT_NAV_ITEMS,
  brandName = 'Camlio',
  brandYear = '2026',
  facebookUrl,
  instagramUrl,
  xUrl,
  copyrightText = 'Copyright © 2025 Rometheme. All Rights Reserved.',
}: FooterProps) {
  return (
    <footer className="bg-paper">
      <Container className="px-6 pb-6 pt-12 text-center">

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-8 py-4 text-ink transition-colors hover:bg-accent text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Brand row */}
        <div className="relative mt-16 flex max-w-4xl mx-auto items-center justify-center">
          <span className="absolute left-0 hidden font-display text-[2rem] leading-[1.1] text-ink sm:inline">{brandName}</span>
          <h2 className="font-display text-display leading-[1.1] text-ink">
            Wedding<br />Planner
          </h2>
          <span className="absolute right-0 hidden font-display text-[2rem] leading-[1.1] text-ink sm:inline">{brandYear}</span>
        </div>

        {/* Social icons */}
        <div className="mt-10 flex justify-center gap-3">
          {facebookUrl  && <a href={facebookUrl}  aria-label="Facebook"><FacebookIcon /></a>}
          {instagramUrl && <a href={instagramUrl} aria-label="Instagram"><InstagramIcon /></a>}
          {xUrl         && <a href={xUrl}         aria-label="X"><XIcon /></a>}
        </div>

        {/* Divider + copyright */}
        <div className="mt-6 border-t border-ink pt-4">
          <p className="text-ink">{copyrightText}</p>
        </div>
      </Container>
    </footer>
  )
}
