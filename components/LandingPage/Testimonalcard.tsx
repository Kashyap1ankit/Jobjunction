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
            <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
              <div className=" max-w-[350px] p-4 sm:p-8 rounded-xl mx-auto bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg border-2 border-slate-800">
                <Image
                  src={e.avatar}
                  width={400}
                  height={400}
                  className="w-56 sm:w-64"
                  alt="user-image"
                />

                <div className="mt-4 text-center">
                  <p
                    className={`${roboto_slab.className} text-xl sm:text-2xl text-white `}
                  >
                    {e.name}
                  </p>

                  <div
                    className={`${poppins.className} flex gap-2 items-center justify-center`}
                  >
                    <p className="text-gray-500 text-sm">{e.job_title} |</p>

                    <p className="text-gray-500 text-sm">{e.company}</p>
                  </div>

                  <TextDivider className="mt-4">
                    <div className="flex gap-8 items-center">
                      <Link
                        href={e.twitter}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <FaTwitter className="text-sideBarColor size-6 cursor-pointer" />
                      </Link>
                      <Link
                        href={e.linkedin}
                        target="_blank"
                        aria-label="linkedin"
                      >
                        <FaLinkedin className="text-sideBarColor size-6 cursor-pointer" />
                      </Link>
                    </div>
                  </TextDivider>

                  <p
                    className={`${poppins.className} text-sm text-gray-400 mt-4`}
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
