"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { roboto_slab } from "@/utils/fonts/font";

export default function LandingPart3() {
  return (
    <div className="rounded-lg bg-secondaryBorder mt-28 md:mt-52 flex flex-wrap md:flex-nowrap w-11/12 md:w-3/4 gap-8 mx-auto overflow-x-hidden">
      <div className="p-4 md:p-12 ">
        <p
          className={`${roboto_slab.className} text-2xl lg:text-4xl text-white font-bold`}
        >
          We're{" "}
          <span
            className={`${roboto_slab.className}  text-primarySkyBlue cursor-pointer`}
          >
            Open Source
          </span>
        </p>

        <p className="text-xs sm:text-sm text-gray-300 mt-4 w-11/12 md:w-3/4  mb-12 ">
          We are open for everyone who want's to be the part of this communit &
          is capable to contribute to this platform
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href={"https://github.com/Kashyap1ankit/Jobjunction"}>
            <Button
              variant={"outline"}
              className="flex gap-4 font-bold bg-white hover:bg-white border-b-4 border-r-4 border-darkBg w-full"
              aria-label="Github"
            >
              <FaGithub className="size-6" />
              <p>Codebase</p>
            </Button>
          </Link>

          <Link href={"https://x.com/kashyap_tweetts"}>
            <Button
              variant={"outline"}
              className="flex gap-4 font-bold  border-b-4 border-r-4 border-darkBg bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue w-full"
              arial-label="X"
            >
              <FaTwitter className="size-6 fill-white" />
              <p className="text-white">Updates</p>
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        className="p-4 md:p-0 w-full rounded-md shadow-xl md:mt-28 "
        whileHover={{
          x: [0, 50],
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <Image
          src="/Images/Code.png"
          width={5600}
          height={5600}
          alt="Code Snippet"
          className="w-full rounded-md shadow-xl"
        />
      </motion.div>
    </div>
  );
}
