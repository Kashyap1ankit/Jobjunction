import { BriefcaseBusiness, Code, Pin } from "lucide-react";
import { JobLisitingType } from "@/types/types";
import MoreOptionDialog from "./MoreDialog";
import JobSheetComp from "./JobSheet";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculateDayDiff } from "@/utils/helpers/calculate-day-difference";

export default function JobCard({
  id,
  author,
  position,
  company,
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
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const calculatedDiff = calculateDayDiff(createdAt);
    setDiff(calculatedDiff);
  }, []);

  return (
    <div className="flex flex-col gap-8 mt-4 md:mt-0 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-3/4 bg-primaryBorder text-white rounded-xl border-2 border-secondaryBorder hover:cursor-pointer hover:bg-hoverBorder ">
      {/* first section  */}

      <div className="flex justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-radio text-md md:text-2xl tracking-wide font-bold ">
              {position}
            </p>
            {author.role === "ADMIN" ? (
              <MdVerifiedUser className="text-sky-300 size-4" />
            ) : null}
          </div>
          <div className="flex gap-2 items-center flex-wrap mt-2">
            <p className="text-gray-400 text-sm">{company} | </p>
            <p className="text-gray-400 text-sm">
              Posted{" "}
              {diff > 0
                ? diff < 1
                  ? "today"
                  : diff > 1 && diff < 2
                  ? "yesterday"
                  : diff > 2 && diff < 6
                  ? `${Math.ceil(diff)} days ago`
                  : `${Math.ceil(Math.ceil(diff) / 7)} weeks ago`
                : "Invalid posting date"}
              |
            </p>
            <Link
              href={`/user/${author.id}/profile`}
              className="text-gray-400 text-sm hover:cursor-pointer hover:text-blue-500"
              aria-label="username"
            >
              feat: @{author.username}
            </Link>
          </div>
        </div>

        <MoreOptionDialog postId={id} authorId={author.id} />
      </div>

      {/* second section  */}

      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-2 items-center p-2 bg-sky-700 rounded-full">
          <BriefcaseBusiness className="size-4" />
          <p className="text-xs text-white rounded-md">{job_type}</p>
        </div>
        <div className="flex gap-2 items-center p-2 bg-gray-700 rounded-full">
          <Pin className="size-4" />
          <p className="text-xs text-gray-400 rounded-md">{location}</p>
        </div>

        <p className="text-xs text-white p-2 rounded-full bg-green-800">
          {salary_disclosed && salary_min && salary_max
            ? `  ₹ ${Math.round(salary_min / 1000)}k - ₹ ${Math.round(
                salary_max / 1000
              )}k/month`
            : "Not disclosed"}
        </p>
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
          salary_disclosed={salary_disclosed}
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
