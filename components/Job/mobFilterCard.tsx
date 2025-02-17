"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { filterMobSheet } from "@/store/store";
import { Tally3, X } from "lucide-react";
import { lazy } from "react";
import { useRecoilState } from "recoil";
const FilterSideBar = lazy(() => import("@/components/Job/filterCard"));

export default function MobileFilterCard() {
  const [sheetOpen, setSheetOpen] = useRecoilState(filterMobSheet);
  return (
    <div className="p-4 lg:hidden">
      <Sheet open={sheetOpen}>
        <SheetTrigger>
          <Tally3
            className="rotate-90 text-gray-400"
            onClick={() => setSheetOpen(true)}
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="overflow-y-scrol border-r-gray-500 bg-primaryBg"
        >
          <SheetHeader>
            <div className="flex w-full justify-end">
              <X
                className="size-4 text-gray-400"
                onClick={() => setSheetOpen(false)}
              />
            </div>
            <SheetDescription className="flex flex-col gap-8">
              <FilterSideBar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
