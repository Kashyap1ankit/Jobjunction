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
import { BriefcaseBusiness, Pin, X } from "lucide-react";
import { useState } from "react";
import { TbHandClick } from "react-icons/tb";
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
}: JobLisitingType) {
  const [applySheet, setApplySheet] = useState(false);
  return (
    <div id={id}>
      <Sheet open={applySheet}>
        <SheetTrigger
          className={`${roboto_slab.className} flex w-full gap-2 rounded-md bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue p-2 text-xs hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue sm:text-sm`}
          onClick={() => setApplySheet(true)}
        >
          <p className="text-xs sm:text-sm">See More</p>
          <TbHandClick className="size-4" />
        </SheetTrigger>
        <SheetContent className="no-scrollbar w-11/12 overflow-y-scroll border-l-gray-500 bg-primaryBg sm:w-3/4 sm:max-w-full lg:w-1/2">
          <SheetHeader>
            <div className="flex w-full justify-end">
              <X
                onClick={() => setApplySheet(false)}
                className="cursor-pointer text-gray-400"
              />
            </div>
            <SheetTitle className="text-left">
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src={company_logo}
                  height={500}
                  width={500}
                  alt="Post-image"
                  className="w-10 rounded-md"
                  aria-label="post_image"
                />
                <p className="sm:text-md text-sm text-gray-500">{company}</p>
              </div>
              {company_website ? (
                <Link
                  href={company_website}
                  className={`${poppins.className} mt-2 text-lg text-white hover:text-blue-400 hover:underline md:text-xl lg:text-2xl`}
                  target="_blank"
                >
                  {position}
                </Link>
              ) : (
                <p
                  className={`${poppins.className} mt-2 text-lg text-white md:text-xl lg:text-2xl`}
                >
                  {position}
                </p>
              )}

              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full bg-sky-700 p-2">
                  <BriefcaseBusiness className="size-4" />
                  <p className="rounded-md text-xs text-white">{job_type}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-700 p-2">
                  <Pin className="size-4" />
                  <p className="rounded-md text-xs text-gray-400">{location}</p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-sky-700 p-2">
                  <BriefcaseBusiness className="size-4" />
                  <p className="rounded-md text-xs text-white">
                    {experience_level}
                  </p>
                </div>

                <p className="rounded-full bg-green-800 p-2 text-xs text-white">
                  {salary_disclosed && salary_min && salary_max
                    ? `  ₹ ${Math.round(salary_min / 1000)}k - ₹ ${Math.round(
                        salary_max / 1000,
                      )}k/month`
                    : "Not disclosed"}
                </p>
              </div>

              <Separator className="mt-6 bg-gray-500" />
            </SheetTitle>
            <SheetDescription className="text-left text-inherit">
              <div className="mt-4">
                <p className={`${poppins.className} text-xl text-white`}>
                  Posted By
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="size-8 cursor-pointer md:size-10">
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
                      <div className="mt-2 flex items-center gap-2">
                        <MdAdminPanelSettings className="size-4 text-gray-400" />
                        <p className="text-xs font-bold text-gray-400 sm:text-sm">
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
                className="mt-2 w-full overflow-x-hidden rounded-md font-kanit"
                edit={false}
                content={role_description}
              />

              <div className="flex gap-8">
                <Button
                  className={`${fraunces.className} flex w-full gap-2 bg-green-800 hover:bg-green-800`}
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
                    className={`${fraunces.className} flex w-full gap-2 bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
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
