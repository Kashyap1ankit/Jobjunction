import { BriefcaseBusiness, Pin } from "lucide-react";
import { ApprovedJobLisitingType } from "@/types/types";
import { BookmarkPostComp } from "./MoreDialog";

import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculateDayDiff } from "@/utils/helpers/calculate-day-difference";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { universalActivePostModal } from "@/store/store";
import { useRouter } from "next/navigation";

export default function JobCard({
  id,
  author,
  position,
  company,

  company_logo,

  job_type,
  location,
  salary_disclosed,
  salary_min,
  salary_max,
  experience_level,

  createdAt,
  show = true,
}: ApprovedJobLisitingType) {
  const [diff, setDiff] = useState(0);
  const setUniversalActivePostModal = useSetRecoilState(
    universalActivePostModal,
  );

  //eslint-disable-next-line
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const router = useRouter();

  const getPostedTime = (diff: number) => {
    if (diff <= 0) {
      return "Invalid posting date";
    }
    if (diff < 1) {
      return "today";
    }
    if (diff >= 1 && diff < 2) {
      return "yesterday";
    }
    if (diff >= 2 && diff < 6) {
      return `${Math.ceil(diff)} days ago`;
    }
    {
      return `${Math.ceil(Math.ceil(diff) / 7)} weeks ago`;
    }
  };

  useEffect(() => {
    const calculatedDiff = calculateDayDiff(createdAt);
    setDiff(calculatedDiff);
  }, []);

  //calculating the screen size

  useEffect(() => {
    console.log("small screen", window.innerWidth);
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, [window]);

  return (
    <div
      className="mx-auto mt-4 flex w-11/12 flex-col gap-8 rounded-xl border-2 border-secondaryBorder bg-primaryBorder p-4 text-white shadow-lg hover:cursor-pointer hover:bg-hoverBorder md:mt-0 md:p-6 lg:w-3/4"
      onClick={() => {
        isSmallScreen //eslint-disable-line
          ? router.push(`/jobs/${id}`)
          : setUniversalActivePostModal(id);
      }}
    >
      {/* first section  */}

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={company_logo}
              height={500}
              width={500}
              alt="Post-image"
              className="h-16 w-16 rounded-md"
              aria-label="post_image"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-radio text-md font-bold tracking-wide hover:text-blue-600 md:text-2xl">
                {position}
              </p>
              {author.role === "ADMIN" ? (
                <MdVerifiedUser className="size-4 text-sky-300" />
              ) : null}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="text-sm text-gray-400">{company} | </p>
              <p className="text-sm text-gray-400">
                Posted {getPostedTime(diff)}
              </p>
            </div>
          </div>
        </div>

        <BookmarkPostComp postId={id} />
      </div>

      {/* second section  */}

      <div className="flex flex-wrap gap-2">
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
          <p className="rounded-md text-xs text-white">{experience_level}</p>
        </div>

        <p className="rounded-full bg-green-800 p-2 text-xs text-white">
          {salary_disclosed && salary_min && salary_max
            ? `  ₹ ${Math.round(salary_min / 1000)}k - ₹ ${Math.round(
                salary_max / 1000,
              )}k/month`
            : "Not disclosed"}
        </p>
      </div>

      {/* third section  */}
      {show ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/user/${author.id}/profile`}
            className="text-sm text-gray-400 hover:cursor-pointer hover:text-blue-500"
            aria-label="username"
          >
            ft: @{author.username.slice(0, 15)}..
          </Link>
        </div>
      ) : null}
    </div>
  );
}
