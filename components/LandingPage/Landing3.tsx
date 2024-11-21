"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { poppins, roboto_slab } from "@/utils/fonts/font";

export default function LandingPart3() {
  return (
    <div className="mx-auto mt-28 flex w-11/12 flex-col gap-8 overflow-x-hidden rounded-lg border-2 border-slate-900 bg-gradient-to-t from-secondaryTestimoanlBg to-primaryTestimonalBg md:mt-52 md:flex-row xl:w-3/4">
      <div className="p-4 md:p-8 lg:p-12">
        <p
          className={`${roboto_slab.className} text-2xl font-bold text-white sm:text-3xl lg:text-4xl`}
        >
          We&apos;re{" "}
          <span
            className={`${roboto_slab.className} cursor-pointer text-primarySkyBlue`}
          >
            Open Source
          </span>
        </p>

        <p
          className={`${poppins.className} mb-12 mt-4 w-11/12 text-xs text-gray-300 sm:text-sm md:w-3/4`}
        >
          We are open for everyone who want&apos;s to be the part of this
          communit & is capable to contribute to this platform
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={"https://github.com/Kashyap1ankit/Jobjunction"}
            aria-label="github"
          >
            <Button
              variant={"outline"}
              className="flex w-full gap-4 border-b-4 border-r-4 border-darkBg bg-white font-bold hover:bg-white"
              aria-label="Github"
            >
              <FaGithub className="size-6" />
              <p>Codebase</p>
            </Button>
          </Link>

          <Link href={"https://x.com/kashyap_tweetts"} aria-label="twitter">
            <Button
              variant={"outline"}
              className="flex w-full gap-4 border-b-4 border-r-4 border-darkBg bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue font-bold hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue"
              arial-label="X"
            >
              <FaTwitter className="size-6 fill-white" />
              <p className="text-white">Updates</p>
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        className="w-full rounded-md p-4 shadow-xl md:mt-28 md:p-0"
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
          className="h-full w-full cursor-pointer rounded-md shadow-xl md:rounded-none md:rounded-tl-md"
        />
      </motion.div>
    </div>
  );
}
