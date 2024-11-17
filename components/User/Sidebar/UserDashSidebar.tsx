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
      <div className="hidden min-h-screen border-r-2 border-primaryBorder pt-8 md:block">
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
            className="border-r-gray-500 bg-primaryBg"
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
