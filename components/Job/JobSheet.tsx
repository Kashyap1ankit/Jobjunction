import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JobLisitingType } from "@/types/types";
import { fraunces, poppins, roboto_slab } from "@/utils/fonts/font";
import { BadgeIndianRupee, X } from "lucide-react";
import { useState } from "react";
import { TbHandClick } from "react-icons/tb";
import Tiptap from "./Create/TipTap";
import { Button } from "../ui/button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { MdAdminPanelSettings } from "react-icons/md";

export default function JobSheetComp({
  id,
  author,
  position,
  company,
  role_description,
  job_type,
  location,
  role_name,
  salary_min,
  salary_max,
  experience_level,
  apply_link,
  createdAt,
}: JobLisitingType) {
  const [applySheet, setApplySheet] = useState(false);
  return (
    <div id={id}>
      <Sheet open={applySheet}>
        <SheetTrigger
          className={`${roboto_slab.className}  flex gap-2 p-2 rounded-md text-xs sm:text-sm bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue w-full`}
          onClick={() => setApplySheet(true)}
        >
          <p className="text-xs sm:text-sm ">See More</p>
          <TbHandClick className="size-4" />
        </SheetTrigger>
        <SheetContent className="w-11/12 sm:w-3/4  lg:w-1/2  sm:max-w-full overflow-y-scroll no-scrollbar">
          <SheetHeader>
            <div className="flex justify-end w-full">
              <X
                onClick={() => setApplySheet(false)}
                className="cursor-pointer"
              />
            </div>
            <SheetTitle className="text-left">
              <p className="text-gray-500 text-xs sm:text-sm ">{company}</p>
              <p
                className={`${poppins.className} text-lg md:text-xl lg:text-2xl mt-2`}
              >
                {position}
              </p>
              <div className="flex gap-4 mt-2 flex-wrap items-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  {experience_level} |
                </p>
                <p className="text-xs sm:text-sm text-gray-600">{job_type} |</p>
                <p className="text-xs sm:text-sm text-gray-600">{location} |</p>
              </div>
              <Separator className="mt-6" />
            </SheetTitle>
            <SheetDescription className="text-inherit text-left">
              <div className="mt-4">
                <p className={`${poppins.className} text-xl`}>Posted By</p>

                <div className="flex gap-2 items-center mt-4">
                  <Avatar className="cursor-pointer size-8 md:size-10">
                    <AvatarImage
                      src={author.avatar ? author.avatar : "/Images/avatar.png"}
                    />
                    <AvatarFallback>CO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="overlfow-x-hidden">{author.username}</p>
                    {author.role ? (
                      <div className="flex gap-2 items-center mt-2">
                        <MdAdminPanelSettings className="text-gray-400 size-4" />
                        <p className="text-xs sm:text-sm text-gray-400 font-bold">
                          {author.role.toLowerCase()}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <Separator className="mt-6" />
              <Tiptap
                className="  rounded-md w-full font-kanit mt-2   overflow-x-hidden"
                edit={false}
                content={role_description}
              />

              <div className="flex justify-between items-center flex-wrap">
                <div className="flex gap-2">
                  <BadgeIndianRupee />
                  <p>
                    ₹{salary_min} - <span>₹{salary_max}</span>/month
                  </p>
                </div>

                <Link href={apply_link} className="flex justify-end mt-4 ">
                  <Button className="w-full">Apply</Button>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
