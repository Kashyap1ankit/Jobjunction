"use client";

import JobCard from "@/components/Job/jobCard";
import { useEffect } from "react";
import { GetAllPost } from "@/app/actions/posts/jobs";
import { toast } from "sonner";
import { GetAllPostResponseType, JobLisitingType } from "@/types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allJobListings,
  joblistingError,
  universalLoader,
} from "@/store/store";
import JobCardSkeleton from "./jobCardSkeletion";

export default function AllJobsComp() {
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [loading, setLoading] = useRecoilState(universalLoader);
  const errorNoPost = useRecoilValue(joblistingError);

  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const response: GetAllPostResponseType = await GetAllPost();
        if (response.status !== 200) throw new Error(response.message);
        setAllJobs(response.data);
      } catch (error) {
        toast((error as Error).message || "Error Occured");
      } finally {
        setLoading(false);
      }
    };

    getAllJobs();
  }, []);

  return (
    <>
      {errorNoPost || allJobs.length <= 0 ? (
        <div className="w-full h-screen max-h-screen flex items-center justify-center text-white">
          <p>No Post found</p>
        </div>
      ) : (
        <div className="md:flex md:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar bg-transparent ">
          {loading ? (
            [1, 2, 3].map((_, i) => {
              return (
                <div key={i}>
                  <JobCardSkeleton />
                </div>
              );
            })
          ) : (
            <>
              {allJobs.map((e: JobLisitingType) => {
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
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
}
