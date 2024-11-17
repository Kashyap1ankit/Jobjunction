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
import { poppins, roboto_slab } from "@/utils/fonts/font";

import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import TextDivider from "../ui/text-divider";

export default function Component() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto mt-12 h-fit"
      opts={{
        align: "center",
        loop: true,
      }}
      id="testimonal"
    >
      <CarouselContent className="px-4 md:mx-auto md:px-0">
        {testimonal.map((e: TestimonalCard, i: number) => {
          return (
            <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
              <div className="mx-auto max-w-[350px] rounded-xl border-2 border-slate-800 bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg p-4 sm:p-8">
                <Image
                  src={e.avatar}
                  width={400}
                  height={400}
                  className="w-56 sm:w-64"
                  alt="user-image"
                />

                <div className="mt-4 text-center">
                  <p
                    className={`${roboto_slab.className} text-xl text-white sm:text-2xl`}
                  >
                    {e.name}
                  </p>

                  <div
                    className={`${poppins.className} flex items-center justify-center gap-2`}
                  >
                    <p className="text-sm text-gray-500">{e.job_title} |</p>

                    <p className="text-sm text-gray-500">{e.company}</p>
                  </div>

                  <TextDivider className="mt-4">
                    <div className="flex items-center gap-8">
                      <Link
                        href={e.twitter}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <FaTwitter className="size-6 cursor-pointer text-sideBarColor" />
                      </Link>
                      <Link
                        href={e.linkedin}
                        target="_blank"
                        aria-label="linkedin"
                      >
                        <FaLinkedin className="size-6 cursor-pointer text-sideBarColor" />
                      </Link>
                    </div>
                  </TextDivider>

                  <p
                    className={`${poppins.className} mt-4 text-sm text-gray-400`}
                  >
                    {e.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
