"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import works from "@/data/works.json";
import IntroHeader from "@/components/IntroHeader";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <main>
      <IntroHeader />
      <WorksCarousel />
      <Button className="mx-auto my-8 block rounded-full font-bold text-lg h-full flex justify-center items-center transition-all hover:-translate-y-1">
        <Link href="/works" className="py-2 px-8 h-full">
          すべて見る
        </Link>
      </Button>
    </main>
  );
}

const WorksCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const topWorks = works.slice(0, 6);
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <h1 className="text-2xl font-bold text-center my-4">最近の作品</h1>
      <CarouselContent className="-ml-4 py-4">
        {topWorks.map((work) => (
          <CarouselItem key={work.id} className="basis-1/2 md:basis-1/4 pl-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/works/${work.id}`}>
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={180}
                      height={150}
                      className="w-[180px] h-[150px] object-cover overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{work.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer z-40" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-40" />
    </Carousel>
  );
};
