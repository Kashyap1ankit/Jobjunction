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
          className={`${poppins.className} text-md flex w-fit cursor-pointer items-center gap-4 rounded-md border-2 border-b-8 border-r-8 border-darkBg bg-white p-2 text-black hover:-translate-y-1 hover:bg-white`}
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
            className="text-md flex w-full cursor-pointer gap-2 rounded-md border-2 border-b-8 border-r-8 border-darkBg bg-white p-2 font-bebas text-black hover:-translate-y-1 hover:bg-white"
            aria-label="create-route"
          >
            <p>Post Job</p>

            <Briefcase className="ml-2 size-6" />
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default PWAInstallButton;
