"use client";
import { Button } from "@/components/ui/button";
import { fraunces } from "@/utils/fonts/font";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Link from "next/link";
import { IoWarning } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primaryBg">
      <motion.div
        className="flex items-center"
        animate={{
          y: [-200, 0],
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <span className="text-9xl font-bold text-blue-500">4</span>
        <span>
          <Settings className="delay-600 size-20 animate-spin text-gray-400" />
        </span>
        <span className="text-9xl font-bold text-blue-500">4</span>
      </motion.div>
      <div className="flex items-center">
        <IoWarning className="size-6 fill-yellow-500" />
        <p className="text-gray-400">This Page Doesn&apos;t Exist </p>
      </div>

      <Link href={"/"}>
        <Button
          className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
          aria-label="go-back"
        >
          Go To Homepage
        </Button>
      </Link>
    </div>
  );
}
