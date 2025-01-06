"use client";

import { GetAllApprovedPost } from "@/app/actions/posts/jobs";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JobCard from "../Job/jobCard";

export default function RecentJobsPosting() {
  const [allJobs, setAllJobs] = useState<ApprovedJobLisitingType[] | []>([]);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response: GetAllPostResponseType = await GetAllApprovedPost();
        if (response.status !== 200) throw new Error(response.message);
        setAllJobs(response.data.slice(0, 4));
      } catch (error) {
        toast((error as Error).message || "Error Occured");
      }
    };

    getAllJobs();
  }, []);

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {allJobs.map((e: ApprovedJobLisitingType) => {
        return (
          <JobCard
            key={e.id}
            id={e.id}
            author={e.author}
            position={e.position}
            company={e.company}
            company_logo={e.company_logo}
            company_website={e.company_website}
            role_description={e.role_description}
            job_type={e.job_type}
            location={e.location}
            salary_min={e.salary_min}
            salary_max={e.salary_max}
            experience_level={e.experience_level}
            apply_link={e.apply_link}
            createdAt={e.createdAt}
            salary_disclosed={e.salary_disclosed}
            show={false}
          />
        );
      })}
    </div>
  );
}
