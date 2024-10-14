"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import testimonal from "@/data/Testimonals.json";
import { TestimonalCard } from "@/types/types";
import Image from "next/image";
import { roboto_slab } from "@/utils/fonts/font";
import { Separator } from "../ui/separator";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Component() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" mx-auto mt-12  h-fit"
      opts={{
        align: "center",
        loop: true,
      }}
      id="testimonal"
    >
      <CarouselContent className="md:mx-auto px-4 md:px-0 ">
        {testimonal.map((e: TestimonalCard, i: number) => {
          return (
            <CarouselItem key={i} className=" lg:basis-1/2">
              <div className=" max-w-[600px] p-4 sm:p-8 rounded-lg mx-auto bg-primaryBorder flex flex-col sm:flex-row sm:items-start gap-6 ">
                <Image
                  src={e.avatar}
                  width={400}
                  height={400}
                  className="w-20 sm:w-24 h-20 rounded-full"
                  alt="user-image"
                />

                <div>
                  <p
                    className={`${roboto_slab.className} text-xl sm:text-2xl text-white `}
                  >
                    {e.name}
                  </p>

                  <div className="flex gap-2 items-center ">
                    <p className="text-gray-500 text-sm">{e.job_title} |</p>

                    <p className="text-gray-500 text-sm">{e.company}</p>
                  </div>

                  <Separator className="mt-4 w-full" />

                  <p className="text-sm text-gray-400 mt-4">{e.description}</p>

                  <div className="mt-4 flex gap-8 items-center">
                    <Link href={e.twitter} target="_blank">
                      <FaTwitter className="text-sideBarColor size-4 cursor-pointer" />
                    </Link>
                    <Link href={e.linkedin} target="_blank">
                      <FaLinkedin className="text-sideBarColor size-4 cursor-pointer" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
