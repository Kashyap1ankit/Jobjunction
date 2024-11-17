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
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Code,
  Pin,
  X,
} from "lucide-react";
import { useState } from "react";
import { TbClick, TbHandClick } from "react-icons/tb";
import Tiptap from "./Create/TipTap";
import { Button } from "../ui/button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { MdAdminPanelSettings } from "react-icons/md";
import Image from "next/image";
import { BookmarkPostComp } from "./MoreDialog";

export default function JobSheetComp({
  id,
  author,
  position,
  company,
  company_logo,
  company_website,
  role_description,
  job_type,
  location,
  salary_disclosed,
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
        <SheetContent className="w-11/12 sm:w-3/4  lg:w-1/2  sm:max-w-full overflow-y-scroll no-scrollbar bg-primaryBg border-l-gray-500 ">
          <SheetHeader>
            <div className="flex justify-end w-full">
              <X
                onClick={() => setApplySheet(false)}
                className="cursor-pointer text-gray-400"
              />
            </div>
            <SheetTitle className="text-left">
              <div className="flex gap-2 items-center mb-4">
                <Image
                  src={company_logo}
                  height={500}
                  width={500}
                  alt="Post-image"
                  className="w-10   rounded-md"
                  aria-label="post_image"
                />
                <p className="text-gray-500 text-sm sm:text-md  ">{company}</p>
              </div>
              {company_website ? (
                <Link
                  href={company_website}
                  className={`${poppins.className} text-lg md:text-xl lg:text-2xl mt-2 text-white hover:underline hover:text-blue-400`}
                  target="_blank"
                >
                  {position}
                </Link>
              ) : (
                <p
                  className={`${poppins.className} text-lg md:text-xl lg:text-2xl mt-2 text-white`}
                >
                  {position}
                </p>
              )}

              <div className="flex gap-2 flex-wrap mt-2">
                <div className="flex gap-2 items-center p-2 bg-sky-700 rounded-full">
                  <BriefcaseBusiness className="size-4" />
                  <p className="text-xs text-white rounded-md">{job_type}</p>
                </div>
                <div className="flex gap-2 items-center p-2 bg-gray-700 rounded-full">
                  <Pin className="size-4" />
                  <p className="text-xs text-gray-400 rounded-md">{location}</p>
                </div>

                <div className="flex gap-2 items-center p-2 bg-sky-700 rounded-full">
                  <BriefcaseBusiness className="size-4" />
                  <p className="text-xs text-white rounded-md">
                    {experience_level}
                  </p>
                </div>

                <p className="text-xs text-white p-2 rounded-full bg-green-800">
                  {salary_disclosed && salary_min && salary_max
                    ? `  ₹ ${Math.round(salary_min / 1000)}k - ₹ ${Math.round(
                        salary_max / 1000,
                      )}k/month`
                    : "Not disclosed"}
                </p>
              </div>

              <Separator className="mt-6 bg-gray-500" />
            </SheetTitle>
            <SheetDescription className="text-inherit text-left ">
              <div className="mt-4">
                <p className={`${poppins.className} text-xl text-white`}>
                  Posted By
                </p>

                <div className="flex gap-2 items-center mt-4">
                  <Avatar className="cursor-pointer size-8 md:size-10">
                    <AvatarImage
                      src={author.avatar ? author.avatar : "/Images/avatar.png"}
                    />
                    <AvatarFallback>CO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className={`${poppins.className} overlfow-x-hidden text-white`}
                    >
                      {author.username}
                    </p>
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
              <Separator className="mt-6 bg-gray-500" />
              <Tiptap
                className="rounded-md w-full font-kanit mt-2   overflow-x-hidden "
                edit={false}
                content={role_description}
              />

              <div className="flex gap-8">
                <Button
                  className={`${fraunces.className} bg-green-800 hover:bg-green-800 w-full flex gap-2`}
                  aria-label="mobile-apply"
                >
                  <BookmarkPostComp postId={id} />
                  <p className="text-md md:text-lg">Save</p>
                </Button>

                <Link
                  href={apply_link}
                  className="block w-full"
                  aria-label="apply"
                >
                  <Button
                    className={`${fraunces.className} flex gap-2 bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue w-full`}
                    aria-label="mobile-apply"
                  >
                    <TbHandClick className="size-4 md:size-6" />
                    <p className="text-md md:text-lg">Apply</p>
                  </Button>
                </Link>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
