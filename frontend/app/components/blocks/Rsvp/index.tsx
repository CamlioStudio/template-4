// RSVP form — Figma node 24:2423
import Image from "next/image";
import { Container } from "@/app/components/Container";
import { FlowerDecor } from "@/app/components/ui/FlowerDecor";
import type { Rsvp } from "@/sanity.types";

const inputCls =
  "w-full bg-white px-3 py-4 text-sm text-ink placeholder:text-muted/60 outline-none focus:ring-2 focus:ring-ink/20";

export default function RsvpBlock({ block }: { block: Rsvp; index: number }) {
  const { heading, subtitle } = block
  return (
    <div className="bg-white lg:pt-36 pt-48 -mb-30 lg:mb-0">
      <section className="relative bg-cream py-10">
        {/* Bottom-left flower */}
        <Image
          src="/flower-left.png"
          alt=""
          aria-hidden="true"
          width={347}
          height={410}
          className="pointer-events-none absolute bottom-0 left-0 hidden opacity-70 lg:block"
        />

        <Container className="relative rounded-lg z-10 px-6 -translate-y-36">
          <div className="mx-auto max-w-200 bg-paper">
            {/* Header */}
            <div className="relative flex flex-col items-center gap-8 pt-24 text-center">
              <FlowerDecor />
              <h2 className="font-display text-section leading-[1.1] text-ink">
                {heading}
              </h2>
              <p className="max-w-md text-sm text-muted">{subtitle}</p>
            </div>

            {/* Form */}
            <form
              className="mt-8 flex flex-col gap-6 p-5 lg:p-20"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Row 1: Name + Email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={inputCls}
                />
                <input
                  type="email"
                  placeholder="Your E-mail"
                  className={inputCls}
                />
              </div>

              {/* Row 2: Guest select + Confirm select */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                  <select className={`${inputCls} appearance-none`}>
                    <option value="">Select Guest</option>
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <select className={`${inputCls} appearance-none`}>
                    <option value="">Confirm</option>
                    <option>Attending</option>
                    <option>Not Attending</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                placeholder="Your Message"
                className={`${inputCls} min-h-33.25 resize-none py-3`}
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-10 py-4 text-sm text-ink transition-colors hover:bg-sand"
              >
                Confirm Attendance
              </button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
