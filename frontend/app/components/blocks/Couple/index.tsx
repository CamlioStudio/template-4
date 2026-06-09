// Couple — Meet the Couple section — Figma node 24:2263
import Image from "next/image";
import { HighlightedHeading } from "@/app/components/ui/HighlightedHeading";
import type { Couple } from "@/sanity.types";

// ── Social icons ─────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4.25"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-4.25"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L2.25 2.25h6.983l4.26 5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-4.25"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-4.25"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.77 1.51V6.74a4.85 4.85 0 01-1-.05z" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "instagram") return <InstagramIcon />;
  if (platform === "x") return <XIcon />;
  if (platform === "facebook") return <FacebookIcon />;
  if (platform === "tiktok") return <TiktokIcon />;
  return null;
}

// ── Sub-components ────────────────────────────────────────────────────────────

type PersonType = NonNullable<Couple["people"]>[number];

function PersonText({ person }: { person: PersonType }) {
  return (
    <div className="flex flex-col gap-11.5 w-full lg:w-121.5">
      <div className="flex flex-col gap-2">
        {person.name && (
          <h3 className="font-display text-[2.5rem] leading-[1.1] text-ink">
            {person.name}
          </h3>
        )}
        {person.role && (
          <p className="font-display text-[1.25rem] leading-[1.1] text-muted">
            {person.role}
          </p>
        )}
      </div>
      {person.bio && (
        <p className="font-body text-body leading-normal text-muted">
          {person.bio}
        </p>
      )}
      {person.socials && person.socials.length > 0 && (
        <div className="flex">
          {person.socials.map((s, j) => (
            <a
              key={j}
              href={s.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform ?? ""}
              className="size-10.5 text-ink hover:text-accent transition-colors flex items-center justify-center"
            >
              <SocialIcon platform={s.platform ?? ""} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonPhoto({
  photo,
  name,
}: {
  photo?: string | null;
  name?: string;
}) {
  return (
    <div className="relative h-130 w-full lg:w-147 overflow-hidden bg-paper">
      {photo && (
        <Image
          src={photo}
          alt={name ?? ""}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          quality={90}
          className="object-cover rounded-xl shadow"
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type CoupleBlockProps = { block: Couple; index: number };

export default function CoupleBlock({ block }: CoupleBlockProps) {
  const { heading, decorImage, people, highlights } = block;
  return (
    <section>
      {/* Centered heading with overlapping flower decor */}
      <div className="flex flex-col items-center pt-20 pb-10 lg:pt-26 lg:pb-10">
        <div className="relative -mb-5 h-20 w-16.5">
          <Image
            src={decorImage ?? "/flower.png"}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        {heading && (
          <HighlightedHeading
            as="h2"
            text={heading}
            highlights={highlights}
            className="font-display text-[4rem] leading-[1.1] text-ink text-center"
          />
        )}
      </div>

      {/* Person rows — alternating text/image layout */}
      <div className="flex flex-col gap-5">
        {people?.map((person, i) => {
          const textLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`px-4 lg:px-30 py-10 lg:py-16 ${textLeft ? "items-end" : "items-start"}`}
            >
              <div className={`flex flex-col lg:flex-row gap-8 justify-between ${textLeft ? "" : "lg:flex-row-reverse"}`}>
                <PersonText person={person} />
                <PersonPhoto photo={person.photo} name={person.name} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
