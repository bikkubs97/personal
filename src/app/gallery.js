"use client";

import React from "react";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


const images = [
  {
    src: "/deer.jpg",
    alt: "House in the woods",
  },
  {
    src: "/monkey.jpg",
    alt: "House above the clouds",
  },
  {
    src: "/sunset.jpg",
    alt: "Greens all over",
  },
  {
    src: "/synagog.jpg",
    alt: "Rivers are serene",
  },
   {
    src: "/plant.jpg",
    alt: "Rivers are serene",
  },
   {
    src: "/night.jpg",
    alt: "Rivers are serene",
  },
];

export default function MasonryGallery() {
  return (
    <section id="gallery" className="bg-black relative py-16 overflow-hidden px-10">
      {/* Purple blurred background */}
      <div className="absolute top-1/2 left-1/2 w-[80vw] h-[300px] bg-purple-700 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-24 text-center">
         Some of My Clicks
        </h2>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 3 }}>
          <Masonry gutter="16px">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-full overflow-hidden rounded-lg shadow-md group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
