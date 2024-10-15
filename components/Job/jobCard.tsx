import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BriefcaseBusiness, Code, Pin } from "lucide-react";
import { JobLisitingType } from "@/types/types";
import MoreOptionDialog from "./MoreDialog";
import JobSheetComp from "./JobSheet";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";

export default function JobCard({
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
  const diff = new Date(Date.now()).getDate() - new Date(createdAt).getDate();

  return (
    <div className="flex flex-col gap-8 mt-4 md:mt-0 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-primaryBorder text-white rounded-xl border-2 border-secondaryBorder hover:cursor-pointer hover:bg-hoverBorder ">
      {/* first section  */}

      <div className="flex justify-between">
        {/* <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer size-8 md:size-10">
              <AvatarImage
                src={author.avatar ? author.avatar : "/Images/avatar.png"}
              />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex gap-2 items-center flex-wrap  overflow-x-scroll no-scrollbar">
            <p>{author.username}</p>
            <Link href={`/user/${author.id}/profile`}>
              <HiExternalLink />
            </Link>
          </PopoverContent>
        </Popover> */}

        <div>
          <div className="flex gap-2 items-center">
            <p className="text-radio text-md md:text-2xl tracking-wide font-bold ">
              {position}
            </p>
            <MdVerifiedUser className="text-sky-300 size-4" />
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-2">
            <p className="text-gray-400 text-sm">{company} | </p>
            <p className="text-gray-400 text-sm">
              Posted{" "}
              {diff >= 0
                ? "today"
                : diff === 1
                ? "yesterday"
                : ` ${Math.abs(diff)}days ago`}{" "}
              |
            </p>
            <Link
              href={`/user/${author.id}/profile`}
              className="text-gray-400 text-sm hover:cursor-pointer hover:text-blue-500"
            >
              feat: @{author.username}
            </Link>
          </div>
        </div>

        <MoreOptionDialog postId={id} authorId={author.id} />
      </div>

      {/* second section  */}

      <div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-2 items-center p-2 bg-sky-700 rounded-full">
            <BriefcaseBusiness className="size-4" />
            <p className="text-xs text-white rounded-md">{job_type}</p>
          </div>
          <div className="flex gap-2 items-center p-2 bg-gray-700 rounded-full">
            <Pin className="size-4" />
            <p className="text-xs text-gray-400 rounded-md">{location}</p>
          </div>

          <div className="flex gap-2 items-center p-2 bg-gray-700 rounded-full">
            <Code className="size-4" />
            <p className="text-xs text-white  rounded-md">{role_name}</p>
          </div>
          <p className="text-xs text-white p-2 rounded-full bg-green-800">
            ₹{salary_min / 1000}k -{" "}
            <span>₹{Math.round(salary_max / 1000)}k</span>/month
          </p>
        </div>
      </div>

      {/* third section  */}

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <BriefcaseBusiness />
          <p>{experience_level}</p>
        </div>

        <JobSheetComp
          id={id}
          author={author}
          position={position}
          company={company}
          role_description={role_description}
          job_type={job_type}
          location={location}
          role_name={role_name}
          salary_min={salary_min}
          salary_max={salary_max}
          experience_level={experience_level}
          apply_link={apply_link}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
