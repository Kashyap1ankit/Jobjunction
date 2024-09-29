"use client";

import { BeforeInstallPromptEvent } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Download, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { poppins } from "@/utils/fonts/font";
import Link from "next/link";

const PWAInstallButton = () => {
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installable, setInstallable] = useState<boolean>(false);

  useEffect(() => {
    const transferEvent = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredEvent(e);
      setInstallable(true);
      localStorage.setItem("pwaInstallable", "true");
    };

    const storedInstallable = localStorage.getItem("pwaInstallable");
    if (storedInstallable === "true") {
      setInstallable(true);
    }

    window.addEventListener("beforeinstallprompt", transferEvent);

    return () => {
      window.removeEventListener("beforeinstallprompt", transferEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredEvent) {
      deferredEvent.prompt();
      setDeferredEvent(null);
      setInstallable(false);
      localStorage.removeItem("pwaInstallable");
    }
  };

  return (
    <>
      {installable ? (
        <motion.div
          className={`${poppins.className} flex gap-4 text-md  w-fit  bg-white  rounded-md border-2 border-b-8  border-r-8 border-darkBg cursor-pointer hover:-translate-y-1  text-black p-2  hover:bg-white items-center`}
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            delay: 1,
          }}
          onClick={handleInstallClick}
        >
          <p>Get App</p>
          <Download className="size-4" />
        </motion.div>
      ) : (
        <motion.div
          animate={{
            x: [300, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 1,
          }}
        >
          <Link
            href={"/jobs/create"}
            className="flex gap-2 text-md  w-full   bg-white  rounded-md border-2 border-b-8  border-r-8 border-darkBg cursor-pointer hover:-translate-y-1 font-bebas text-black p-2  hover:bg-white"
          >
            <p>Post Job</p>

            <Briefcase className="size-6 ml-2" />
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default PWAInstallButton;
