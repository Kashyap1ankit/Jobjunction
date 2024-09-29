"use client";

import React from "react";
import GradualSpacing from "../magicui/gradual-spacing";
import { ArrowBigRightDash, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fraunces } from "@/utils/fonts/font";
import PWAInstallButton from "../PwaInstallBtn";

export default function LandingPart1() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
        <GradualSpacing
          duration={2}
          text="Discover Apply"
          className={`text-4xl sm:text-5xl  xl:text-8xl font-kanit mt-28 font-bold break-before-auto ${fraunces.className}`}
        />
        <GradualSpacing
          text="Grow"
          duration={4}
          className={`text-4xl  sm:text-5xl xl:text-8xl font-kanit sm:mt-28 font-bold break-before-auto ${fraunces.className}`}
        />
      </div>

      <div className="flex gap-6 w-full mt-12 justify-center">
        <motion.div
          animate={{
            x: [-300, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 1,
          }}
        >
          <Link
            href={"/jobs"}
            className="flex gap-2 text-md  w-full   bg-white  rounded-md border-2 border-b-8  border-r-8 border-darkBg cursor-pointer hover:-translate-y-1 font-bebas text-black p-2  hover:bg-white"
          >
            <p>Apply Now</p>

            <ArrowBigRightDash className="size-6" />
          </Link>
        </motion.div>

        <PWAInstallButton />
      </div>
    </div>
  );
}
