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

export default function Navbar() {
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 py-4 px-4 sm:px-12  border-b-2 border-primaryBorder w-full z-50 bg-primaryBg backdrop-blur-md bg-primaryBg/60 ">
      <Link href={"/"} aria-label="jj">
        <div className="flex items-center gap-4">
          <Image
            src={"/Images/jj-logo.png"}
            width={500}
            height={500}
            className="rounded-md w-12"
            alt="JJ"
          />

          <p className={`${workSans.className} text-white text-xl md:text-2xl`}>
            Job <span className="text-primarySkyBlue ">Junction</span>
          </p>
        </div>
      </Link>

      {session.status === "authenticated" ? (
        <Profile />
      ) : (
        <>
          <div className="hidden sm:inline-flex ">
            <NavComponent />;
          </div>

          <div className="block sm:hidden">
            <Sheet>
              <SheetTrigger>
                <Tally3 className="rotate-90 text-white" />
              </SheetTrigger>
              <SheetContent className="bg-primaryBg border-l-primaryBorder">
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
  );
}
