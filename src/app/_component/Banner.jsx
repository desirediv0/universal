"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export function Banner({ items }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const showControls = items.length > 1;

  return (
    <div className="w-full overflow-hidden relative ">
      <Carousel
        plugins={showControls ? [plugin.current] : []}
        className="w-full"
        onMouseEnter={showControls ? plugin.current.stop : undefined}
        onMouseLeave={showControls ? plugin.current.reset : undefined}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full md:aspect-[21/8] aspect-square">
                <Image
                  src={item.image}
                  alt={`Banner image ${index + 1}`}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                  <section className="md:w-2/3">
                  <h2 className="text-2xl md:text-6xl font-bold mb-4 text-center select-none">
                    {item.heading}
                  </h2>
                  <p className=" text-lg mb-4 text-center select-none">
                    {item.shortdesc}
                  </p>
                  </section>
                  
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
          <>
            <CarouselPrevious className="absolute text-white left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute text-white right-4 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
}