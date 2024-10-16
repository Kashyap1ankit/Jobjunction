"use client";
import Link from "next/link";
import { roboto_slab } from "@/utils/fonts/font";
import Image from "next/image";
import NavComponent from "./NavComp";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const session = useSession();
  if (session.status === "loading") {
    return <div>Loading....</div>;
  }

  return (
    <div className="fixed top-0 left-0 py-2 px-4 sm:px-12  flex justify-between items-center border-b-2 border-primaryBorder w-full z-50 bg-primaryBg backdrop-blur-md bg-primaryBg/60">
      <Link href={"/"}>
        <div className="flex items-center gap-4">
          <Image
            src={"/Images/jj-logo.png"}
            width={50}
            height={0}
            className="rounded-md"
            alt="JJ"
          />

          <p
            className={`${roboto_slab.className} text-white text-xl md:text-2xl`}
          >
            Job <span className="text-primarySkyBlue ">Junction</span>
          </p>
        </div>
      </Link>

      {session.status === "authenticated" ? (
        <Profile />
      ) : (
        <>
          <div className="hidden sm:block ">
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
