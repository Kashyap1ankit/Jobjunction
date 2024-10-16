"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tally3 } from "lucide-react";
import SidebarComp from "./SideBarComp";
import { useState } from "react";

export default function UserDashboardSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      <div className=" border-r-2 border-primaryBorder hidden md:block min-h-screen pt-8 ">
        <SidebarComp />
      </div>

      <div className="block md:hidden">
        <Sheet open={sheetOpen}>
          <SheetTrigger onClick={() => setSheetOpen(true)}>
            <Tally3 className="rotate-90 text-gray-400" />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            onClick={() => setSheetOpen(false)}
            className="bg-primaryBg border-r-gray-500"
          >
            <SheetHeader>
              <SheetDescription className="mt-4">
                <SidebarComp />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
