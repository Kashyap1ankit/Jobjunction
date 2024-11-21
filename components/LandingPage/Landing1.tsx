"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { poppins, roboto_slab, workSans } from "@/utils/fonts/font";
import Image from "next/image";

export default function LandingPart1() {
  return (
    <div className="px-4 md:px-0">
      <Link
        href={"https://peerlist.io/kashyap1ankit/project/job-junction"}
        aria-label="peerlist-tag"
        target="_blank"
      >
        <Image
          src={"/Images/peerlist.svg"}
          width={400}
          height={400}
          alt="peerlist-img"
          className="mx-auto mb-4 w-24 md:w-32"
        />
      </Link>

      <div className="flex flex-col flex-wrap items-center gap-4">
        <p
          className={`${roboto_slab.className} w-11/12 text-center text-3xl text-white sm:text-4xl md:text-5xl lg:w-3/4 lg:text-6xl xl:text-7xl`}
        >
          Find your Next Opportunity With Job{" "}
          <motion.span
            className={`${roboto_slab.className} skew-x-12 cursor-pointer text-primarySkyBlue`}
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
          className={`${poppins.className} md:text-md w-full text-center text-xs text-gray-500 sm:w-1/2 lg:text-lg`}
        >
          Whether you&apos;re looking for your next career move or you know a
          great opportunity for others, Job Junction is the place to be
        </p>
      </div>

      <div className="mt-12 flex w-full flex-col justify-center gap-6 sm:flex-row">
        <Link
          href={"/jobs"}
          className={`${workSans.className} md:text-md cursor-pointer rounded-lg bg-primarySkyBlue px-4 py-2 text-center text-sm text-black text-white`}
          aria-label="explore"
        >
          Explore Careers
        </Link>

        <Link
          href={"/#testimonal"}
          className={`${workSans.className} md:text-md z-30 cursor-pointer rounded-lg bg-gray-800 px-4 py-2 text-center text-sm text-black text-white`}
          aria-label="testimonal"
        >
          Success Stories
        </Link>
      </div>
    </div>
  );
}
