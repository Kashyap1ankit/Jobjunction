"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { poppins, roboto_slab, workSans } from "@/utils/fonts/font";

export default function LandingPart1() {
  return (
    <div className=" px-4 md:px-0">
      <div className="flex flex-col gap-4 items-center flex-wrap ">
        <p
          className={`${roboto_slab.className} text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center w-11/12   lg:w-3/4 `}
        >
          Find your Next Opportunity With Job{" "}
          <motion.span
            className={`${roboto_slab.className}  text-primarySkyBlue skew-x-12 cursor-pointer`}
            animate={{
              y: [-200, 0],
            }}
            whileHover={{
              rotate: -5,
            }}
          >
            Junction
          </motion.span>
        </p>

        <p
          className={`${poppins.className} text-xs md:text-md lg:text-lg text-gray-500 text-center w-full  sm:w-1/2`}
        >
          Whether you&apos;re looking for your next career move or you know a
          great opportunity for others, Job Junction is the place to be
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full mt-12 justify-center">
        <Link
          href={"/jobs"}
          className={`${workSans.className}  text-white   rounded-lg bg-primarySkyBlue cursor-pointer text-black py-2 px-4 text-sm md:text-md text-center `}
        >
          Explore Careers
        </Link>

        <Link
          href={"/#testimonal"}
          className={`${workSans.className}  text-white   rounded-lg bg-gray-800 z-30 cursor-pointer text-black py-2 px-4  text-sm md:text-md text-center`}
        >
          Success Stories
        </Link>
      </div>
    </div>
  );
}
