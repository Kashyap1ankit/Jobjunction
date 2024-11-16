"use client";
import { Button } from "@/components/ui/button";
import { fraunces } from "@/utils/fonts/font";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Link from "next/link";
import { IoWarning } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen bg-primaryBg">
      <motion.div
        className="flex items-center "
        animate={{
          y: [-200, 0],
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <span className="text-blue-500 font-bold text-9xl">4</span>
        <span>
          <Settings className="text-gray-400 size-20 animate-spin delay-600" />
        </span>
        <span className="text-blue-500 font-bold text-9xl">4</span>
      </motion.div>
      <div className="flex items-center">
        <IoWarning className="size-6 fill-yellow-500" />
        <p className="text-gray-400">This Page Doesn&apos;t Exist </p>
      </div>

      <Link href={"/"}>
        <Button
          className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue`}
          aria-label="go-back"
        >
          Go To Homepage
        </Button>
      </Link>
    </div>
  );
}
