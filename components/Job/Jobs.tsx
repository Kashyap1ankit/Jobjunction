"use client";

import JobCard from "@/components/Job/jobCard";
import { useEffect } from "react";
import { GetAllApprovedPost } from "@/app/actions/posts/jobs";
import { toast } from "sonner";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allJobListings,
  joblistingError,
  universalActivePostModal,
  universalLoader,
} from "@/store/store";
import JobCardSkeleton from "./jobCardSkeletion";

export default function AllJobsComp() {
  const [allJobs, setAllJobs] = useRecoilState(allJobListings);
  const [loading, setLoading] = useRecoilState(universalLoader);
  const setActivePostModal = useSetRecoilState(universalActivePostModal);
  const errorNoPost = useRecoilValue(joblistingError);

  useEffect(() => {
    const getAllJobs = async () => {
      setLoading(true);
      try {
        const response: GetAllPostResponseType = await GetAllApprovedPost();
        if (response.status !== 200) throw new Error(response.message);
        setAllJobs(response.data);

        setActivePostModal(response.data[0].id);
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
        <div className="flex h-screen max-h-screen w-full items-center justify-center text-white">
          <p>No Post found</p>
        </div>
      ) : (
        <div className="gap-8 bg-transparent py-6 md:flex md:flex-col">
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
