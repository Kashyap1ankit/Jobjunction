"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { poppins, roboto_slab, workSans } from "@/utils/fonts/font";

export default function LandingPart1() {
  return (
    <div className=" px-4 md:px-0">
      <div className="flex flex-col items-center gap-4 justify-center flex-wrap ">
        <p
          className={`${roboto_slab.className} text-white text-3xl md:text-4xl lg:text-7xl text-center`}
        >
          Find Your Next Opportunity
        </p>

        <div className="flex gap-2">
          <p
            className={`${roboto_slab.className} text-white text-3xl md:text-4xl lg:text-7xl`}
          >
            With Job
          </p>
          <motion.span
            className={`${roboto_slab.className} text-3xl md:text-4xl lg:text-7xl text-primarySkyBlue skew-x-12 cursor-pointer`}
            animate={{
              y: [-200, 0],
            }}
            whileHover={{
              rotate: -5,
            }}
          >
            Junction
          </motion.span>
        </div>

        <p
          className={`${poppins.className} text-xs md:text-lg text-gray-500 text-center w-full sm:w-1/2`}
        >
          Whether you&apos;re looking for your next career move or you know a
          great opportunity for others, Job Junction is the place to be
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full mt-12 justify-center">
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
