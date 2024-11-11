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
  universalError,
  universalLoader,
} from "@/store/store";

export default function AllJobsComp() {
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [loading, setLoading] = useRecoilState(universalLoader);
  const [error, setError] = useRecoilState(universalError);
  const errorNoPost = useRecoilValue(joblistingError);

  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const response: GetAllPostResponseType = await GetAllPost();
        if (response.status !== 200) throw new Error(response.message);
        setAllJobs(response.data);
      } catch (error) {
        setError({
          status: false,
          message: (error as Error).message,
        });

        setTimeout(() => {
          setError({
            status: true,
            message: "",
          });
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    getAllJobs();
  }, []);

  {
    error.status ? toast(error.message || "Error Occured") : "";
  }

  return (
    <>
      {errorNoPost ? (
        <div className="w-full h-screen max-h-screen flex items-center justify-center text-white">
          <p>No Post found</p>
        </div>
      ) : (
        <div className="md:flex md:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar bg-transparent ">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center ">
              <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
                JJ
              </p>
            </div>
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
