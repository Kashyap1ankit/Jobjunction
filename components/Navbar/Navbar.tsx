"use client";
import Link from "next/link";
import { workSans } from "@/utils/fonts/font";
import Image from "next/image";
import NavComponent from "./NavComp";
import { useSession } from "next-auth/react";
import Profile from "./Profile";

import { Tally3 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import GetNotification from "../GetNotification";
import PWAInstallButton from "@/components/PwaInstallBtn";

export default function Navbar() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b-2 border-primaryBorder bg-primaryBg bg-primaryBg/60 px-4 py-4 backdrop-blur-md sm:px-12">
      <Link href={"/"} aria-label="jj">
        <div className="flex items-center gap-4">
          <Image
            src={"/Images/jj-logo.png"}
            width={500}
            height={500}
            className="hidden w-12 rounded-md sm:block"
            alt="JJ"
          />

          <p className={`${workSans.className} text-xl text-white md:text-2xl`}>
            Job <span className="text-primarySkyBlue">Junction</span>
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <PWAInstallButton />
        {session.status === "authenticated" ? (
          <>
            <GetNotification />
            <Profile />
          </>
        ) : (
          <>
            <div className="hidden sm:inline-flex">
              <NavComponent />;
            </div>

            <div className="block sm:hidden">
              <Sheet>
                <SheetTrigger>
                  <Tally3 className="rotate-90 text-white" />
                </SheetTrigger>
                <SheetContent className="border-l-primaryBorder bg-primaryBg">
                  <SheetHeader>
                    <SheetDescription>
                      <NavComponent />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
