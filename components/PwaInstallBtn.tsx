"use client";
import { BeforeInstallPromptEvent } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Download, Zap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const PWAInstallButton = () => {
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const transferEvent = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredEvent(e);
    };

    window.addEventListener("beforeinstallprompt", transferEvent);

    return () => {
      window.removeEventListener("beforeinstallprompt", transferEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredEvent) {
      deferredEvent.prompt();
      setDeferredEvent(null);
    } else {
      toast.info("Install prompt is not available.", {
        style: {
          backgroundColor: "grey",
          color: "white",
        },
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="text-2xl text-white">
        <Zap />
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full pb-4 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="jj-logo"
                className="w-12 rounded-md border-2"
                width={500}
                height={500}
                src={"/Images/jj-logo.png"}
              />
              <p>Job Junction</p>
            </div>
            <Button
              className="flex items-center gap-2 rounded-full bg-secondarySkyBlue text-center text-white hover:bg-secondarySkyBlue"
              variant={"secondary"}
              aria-label="pwa-install-button"
              onClick={handleInstallClick}
            >
              <p>Install</p>
              <Download className="size-4" />
            </Button>
          </DrawerTitle>
          <DrawerDescription className="w-3/4 text-left">
            Find your Next Opportunity With Job Junction
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default PWAInstallButton;
