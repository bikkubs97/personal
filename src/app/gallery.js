"use client";

import Image from "next/image";


const images = [
  {
    src: "/deers.jpg",
    alt: "House in the woods",
  },
  {
    src: "/monkeys.jpg",
    alt: "House above the clouds",
  },
  {
    src: "/sunsets.jpg",
    alt: "Greens all over",
  },
  {
    src: "/synagogs.jpg",
    alt: "Rivers are serene",
  },
  {
    src: "/plants.jpg",
    alt: "Rivers are serene",
  },
  {
    src: "/nights.jpg",
    alt: "Rivers are serene",
  },
];

export default function MasonryGallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-black px-4 py-16 sm:px-8 lg:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-semibold leading-tight text-white md:text-4xl">
          Some of My Clicks
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={img.src}
              className="group relative w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_16px_50px_rgba(0,0,0,0.34)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover opacity-95 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx === 0}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 border border-white/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
