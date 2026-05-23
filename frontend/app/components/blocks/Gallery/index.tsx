// Gallery — Figma node 24:2407
import Image from "next/image";
import type { Gallery } from "@/sanity.types";
import { FlowerDecor } from "../../ui/FlowerDecor";

const PHOTO_POSITIONS = [
  { left: "8.33%", top: 0, width: "33.75%", height: 400 },
  { left: "36.53%", top: 253, width: "26.67%", height: 400 },
  { left: "72.08%", top: 0, width: "19.58%", height: 400 },
  { left: "79.17%", top: 333, width: "20.83%", height: 400 },
  { left: "0%", top: 477, width: "30.69%", height: 400 },
] as const;

const GRADIENTS = [
  "linear-gradient(145deg,#5c4a38,#3d2b1f)",
  "linear-gradient(145deg,#4a3828,#2e1f14)",
  "linear-gradient(145deg,#524030,#3a2820)",
  "linear-gradient(145deg,#483825,#2a1a0e)",
  "linear-gradient(145deg,#604e3a,#3d2b1f)",
];

export default function GalleryBlock({
  block,
}: {
  block: Gallery;
  index: number;
}) {
  const { heading, subtitle, viewAllText, viewAllHref, photos = [] } = block;
  return (
    <section className="overflow-hidden lg;py-20 bg-white">
      <div className="relative flex flex-col items-center px-6 pt-24 text-center">
        <FlowerDecor />
        <h2 className="font-display text-section leading-[1.1] ">{heading}</h2>
        <p className="mx-auto mt-3 max-w-md">{subtitle}</p>
      </div>

      {/* Desktop scattered layout */}
      <div
        className="relative mx-auto mt-16 hidden max-w-360 lg:block"
        style={{ height: "877px" }}
      >
        {photos?.length > 0 &&
          PHOTO_POSITIONS.map(({ left, top, width, height }, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-2xl"
              style={{ left, top, width, height, background: GRADIENTS[i] }}
            >
              {photos[i] && (
                <Image
                  src={photos[i] as string}
                  alt={`Gallery photo ${i + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
      </div>

      {/* Mobile 2-column staggered grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 px-4 sm:px-6 lg:hidden">
        {photos?.length > 0 && photos.slice(0, 4).map((photo, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl relative${i % 2 === 1 ? " mt-8" : ""}`}
            style={{
              height: i % 2 === 0 ? 256 : 200,
              background: GRADIENTS[i],
            }}
          >
            {photo && (
              <Image
                src={photo as string}
                alt={`Gallery photo ${i + 1}`}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={viewAllHref}
          className="inline-flex rounded-full px-8 py-3 text-sm  transition-colors bg-accent hover:bg-sand"
        >
          {viewAllText}
        </a>
      </div>
    </section>
  );
}
