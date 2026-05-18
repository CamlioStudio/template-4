import type { ContactUs } from '@/sanity.types'
import { Container } from '@/app/components/Container'
import { cn } from '@/sanity/lib/utils'

type ContactUsProps = {
  block: ContactUs
  index: number
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5]">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5]">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.5]">
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  )
}

export default function ContactUsBlock({ block, index }: ContactUsProps) {
  const title = block.title ?? 'Get In Touch'
  const subtitle = block.subtitle ?? 'We are only a note away from making everything perfect for you.'

  return (
    <section className={cn('bg-paper', index === 0 && 'pt-0')}>
      <div className="hero-checker relative">
        <Container className="flex min-h-112 items-center justify-center py-16">
          <div className="text-center text-white/75">
            <div className="font-script text-section leading-none sm:text-display">Contact Us</div>
          </div>
        </Container>
      </div>

      <Container className="-mt-20 pb-20">
        <div className="mx-auto max-w-4xl rounded-4xl bg-sand px-6 py-10 text-center panel-shadow sm:px-10">
          <div className="mb-3 font-script text-section text-ink sm:text-display">{title}</div>
          <p className="mx-auto max-w-xl text-sm text-muted sm:text-base">{subtitle}</p>

          <form className="mt-8 space-y-4 text-left">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-label text-muted">Your Name</span>
                <input className="h-12 w-full border-0 bg-white px-4 text-sm text-ink outline-none ring-1 ring-ink/10 placeholder:text-muted/60 focus:ring-ink/20" placeholder="Your Name" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-label text-muted">Your E-mail</span>
                <input className="h-12 w-full border-0 bg-white px-4 text-sm text-ink outline-none ring-1 ring-ink/10 placeholder:text-muted/60 focus:ring-ink/20" placeholder="Your E-mail" />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-label text-muted">Subject</span>
              <input className="h-12 w-full border-0 bg-white px-4 text-sm text-ink outline-none ring-1 ring-ink/10 placeholder:text-muted/60 focus:ring-ink/20" placeholder="Subject" />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-label text-muted">Your Message</span>
              <textarea className="min-h-28 w-full border-0 bg-white px-4 py-3 text-sm text-ink outline-none ring-1 ring-ink/10 placeholder:text-muted/60 focus:ring-ink/20" placeholder="Your Message" />
            </label>

            <button className="h-11 w-full rounded-full bg-accent text-sm font-medium text-ink transition-transform hover:scale-[1.01]">
              Confirm Attendance
            </button>
          </form>
        </div>
      </Container>

      <Container className="space-y-14 pb-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <article className="space-y-4">
            <div className="font-script text-section text-ink">Ceremonial Info</div>
            <div className="space-y-3 text-sm text-ink sm:text-base">
              <div className="flex items-start gap-3">
                <CalendarIcon />
                <span>Thursday, 10 June 2026</span>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon />
                <span>5.00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <PinIcon />
                <span>KLLG St, No.99, Pku City, ID 28289</span>
              </div>
            </div>
          </article>

          <div className="map-panel min-h-56 w-full rounded-3xl border border-ink/10" />
        </div>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <article className="space-y-4">
            <div className="font-script text-section text-ink">Reception Info</div>
            <div className="space-y-3 text-sm text-ink sm:text-base">
              <div className="flex items-start gap-3">
                <CalendarIcon />
                <span>Thursday, 10 June 2026</span>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon />
                <span>6.30 PM - Late</span>
              </div>
              <div className="flex items-start gap-3">
                <PinIcon />
                <span>KLLG St, No.99, Pku City, ID 28289</span>
              </div>
            </div>
          </article>

          <div className="map-panel min-h-56 w-full rounded-3xl border border-ink/10" />
        </div>
      </Container>
    </section>
  )
}
