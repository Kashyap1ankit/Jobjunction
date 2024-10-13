"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { roboto_slab } from "@/utils/fonts/font";

export default function LandingPart1() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 justify-center flex-wrap  px-4 md:px-0">
        <p
          className={`${roboto_slab.className} text-white text-3xl md:text-4xl lg:text-5xl text-center`}
        >
          Connecting Talent with Opportunity
        </p>

        <div className="flex gap-2">
          <p
            className={`${roboto_slab.className} text-white text-3xl md:text-4xl lg:text-5xl`}
          >
            Job
          </p>
          <motion.span
            className={`${roboto_slab.className} text-3xl md:text-4xl lg:text-5xl text-primarySkyBlue skew-x-12 cursor-pointer`}
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

        <p className="text-xs md:text-md text-gray-500 text-center w-full sm:w-1/2">
          Whether you&apos;re looking for your next career move or you know a
          great opportunity for others, Job Junction is the place to be
        </p>
      </div>

      <div className="flex gap-6 w-full mt-12 justify-center">
        <Link
          href={"/jobs"}
          className={`${roboto_slab.className}  text-white   rounded-lg bg-primarySkyBlue cursor-pointer text-black py-2 px-4 `}
        >
          <p className="text-sm md:text-md">Get Hired</p>
        </Link>

        <Link
          href={"/#testimonal"}
          className={`${roboto_slab.className}  text-white   rounded-lg bg-transparent border-2 border-slate-800 cursor-pointer text-black py-2 px-4  `}
        >
          <p className="text-sm md:text-md">Testimonal</p>
        </Link>
      </div>
    </div>
  );
}
