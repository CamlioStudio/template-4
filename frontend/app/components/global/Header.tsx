'use client'

import { useState } from 'react'
import { Container } from "@/app/components/Container";
import { Logo } from "../icons/logo";
import Link from 'next/link';
import { cn } from "../../../sanity/lib/utils";

type NavItem = { label: string; href: string }

type HeaderProps = {
  navLeft?: NavItem[]
  navRight?: NavItem[]
  rsvpLabel?: string
  rsvpHref?: string
}

const DEFAULT_NAV_LEFT = [{ label: 'Home', href: '/' }, { label: 'Our Story', href: '/our-story' }, { label: 'Location', href: '/location' }]
const DEFAULT_NAV_RIGHT = [{ label: 'Gallery', href: '/gallery' }, { label: 'Blog', href: '/blog' }, { label: 'Pages', href: '/pages' }]

export function Header({ navLeft = DEFAULT_NAV_LEFT, navRight = DEFAULT_NAV_RIGHT, rsvpLabel = 'RSVP', rsvpHref = '/rsvp' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const allNav = [...navLeft, ...navRight, { label: rsvpLabel, href: rsvpHref }]

  return (
    <>
      <header className="bg-paper">
        <Container className={cn('relative', 'flex', 'h-20.75', 'items-center', 'px-6', 'justify-between')}>
          {/* Hamburger icon — mobile only */}
          <div>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={cn('shrink-0', 'text-ink', 'transition-opacity', 'hover:opacity-60', 'lg:hidden')}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <line x1="4" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Left nav — desktop only */}
            <nav className={cn('ml-8', 'hidden', 'items-center', 'gap-8', 'text-sm', 'text-muted', 'lg:flex', 'relative', 'z-10')}>
              {navLeft.map(({ label, href }) => (
                <a key={label} href={href} className={cn('transition-colors', 'hover:text-ink')}>{label}</a>
              ))}
            </nav>
          </div>

          {/* Center logo — absolutely centered */}
          <div className={cn('inset-x-0', 'flex', 'justify-center')}>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Mobile spacer */}
          <div className={cn('flex-1', 'lg:hidden')} />

          {/* Right nav + RSVP — desktop */}
          <div>
            <div className={cn('ml-auto', 'hidden', 'items-center', 'gap-8', 'lg:flex')}>
              <nav className={cn('flex', 'items-center', 'gap-8', 'text-sm', 'text-muted')}>
                {navRight.map(({ label, href }) => (
                  <a key={label} href={href} className={cn('transition-colors', 'hover:text-ink')}>{label}</a>
                ))}
              </nav>
              <a href={rsvpHref} className={cn('rounded-full', 'border', 'border-ink', 'px-6', 'py-2.5', 'text-sm', 'text-ink', 'transition-colors', 'hover:bg-ink', 'hover:text-paper')}>
                {rsvpLabel}
              </a>
            </div>
            {/* Mobile RSVP only */}
            <a href={rsvpHref} className={cn('shrink-0', 'rounded-full', 'border', 'border-ink', 'px-4', 'py-2', 'text-xs', 'text-ink', 'transition-colors', 'hover:bg-ink', 'hover:text-paper', 'lg:hidden')}>
              {rsvpLabel}
            </a>
          </div>
        </Container>
      </header>

      {/* Fullscreen overlay menu */}
      <div
        className={[
          'fixed inset-0 z-50 flex flex-col bg-paper/90 px-6 py-8 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cn('self-end', 'text-ink', 'transition-opacity', 'hover:opacity-60')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Nav items — centered */}
        <nav className={cn('flex', 'flex-1', 'flex-col', 'items-center', 'justify-center', 'gap-10')}>
          {allNav.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={cn('rounded-full', 'px-8', 'py-3', 'text-3xl', 'text-ink', 'transition-colors', 'hover:bg-accent')}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
