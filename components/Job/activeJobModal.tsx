"use client";

import { GetJobById } from "@/app/actions/posts/jobs";
import Tiptap from "@/components/Job/Create/TipTap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { universalActivePostModal } from "@/store/store";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { fraunces, poppins } from "@/utils/fonts/font";
import { BriefcaseBusiness, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

export default function ActivePostModal() {
  const activeJobModalId = useRecoilValue(universalActivePostModal);
  const [currentData, setCurrentData] = useState<
    ApprovedJobLisitingType | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPostDetails() {
      setLoading(true);
      try {
        const response: GetAllPostResponseType =
          await GetJobById(activeJobModalId);
        if (response.status !== 200) throw new Error(response.message);
        setCurrentData(response.data[0]);
      } catch (error) {
        toast((error as Error).message || "Error Occured");
      } finally {
        setLoading(false);
      }
    }

    getPostDetails();
  }, [activeJobModalId]);

  return (
    <>
      {loading || !currentData ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <div className="text-left">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src={currentData.company_logo}
                height={500}
                width={500}
                alt="Post-image"
                className="w-10 rounded-md"
                aria-label="post_image"
              />
              <p className="sm:text-md text-sm text-gray-500">
                {currentData.company}
              </p>
            </div>
            {currentData.company_website ? (
              <Link
                href={currentData.company_website}
                className={`${poppins.className} mt-2 text-lg text-white hover:text-blue-400 hover:underline md:text-xl lg:text-2xl`}
                target="_blank"
              >
                {currentData.position}
              </Link>
            ) : (
              <p
                className={`${poppins.className} mt-2 text-lg text-white md:text-xl lg:text-2xl`}
              >
                {currentData.position}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-full bg-sky-700 p-2">
                <BriefcaseBusiness className="size-4" />
                <p className="rounded-md text-xs text-white">
                  {currentData.job_type}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-700 p-2">
                <Pin className="size-4" />
                <p className="rounded-md text-xs text-gray-400">
                  {currentData.location}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-sky-700 p-2">
                <BriefcaseBusiness className="size-4" />
                <p className="rounded-md text-xs text-white">
                  {currentData.experience_level}
                </p>
              </div>

              <p className="rounded-full bg-green-800 p-2 text-xs text-white">
                {currentData.salary_disclosed &&
                currentData.salary_min &&
                currentData.salary_max
                  ? `  ₹ ${Math.round(currentData.salary_min / 1000)}k - ₹ ${Math.round(
                      currentData.salary_max / 1000,
                    )}k/month`
                  : "Not disclosed"}
              </p>
            </div>

            <Separator className="mt-6 bg-gray-500" />
          </div>
          <div className="text-left text-inherit">
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className={`${poppins.className} text-xl text-white`}>
                  Posted By
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="size-8 cursor-pointer md:size-10">
                    <AvatarImage
                      src={
                        currentData.author.avatar
                          ? currentData.author.avatar
                          : "/Images/avatar.png"
                      }
                    />
                    <AvatarFallback>CO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className={`${poppins.className} overlfow-x-hidden text-white`}
                    >
                      {currentData.author.username}
                    </p>
                    {currentData.author.role ? (
                      <div className="mt-2 flex items-center gap-2">
                        <MdAdminPanelSettings className="size-4 text-gray-400" />
                        <p className="text-xs font-bold text-gray-400 sm:text-sm">
                          {currentData.author.role.toLowerCase()}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={currentData.apply_link}
                aria-label="apply"
                target="_blank"
              >
                <Button
                  className={`${fraunces.className} flex w-fit gap-2 bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
                  aria-label="mobile-apply"
                >
                  <TbHandClick className="size-4 md:size-6" />
                  <p className="text-md md:text-lg">Apply</p>
                </Button>
              </Link>
            </div>
            <Separator className="mt-6 bg-gray-500" />
            <Tiptap
              className="mt-2 w-full overflow-x-hidden rounded-md font-kanit"
              edit={false}
              content={currentData.role_description}
            />
          </div>
        </>
      )}
    </>
  );
}
