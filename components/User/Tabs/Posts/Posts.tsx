"use client";

import { GetPostByAuthorId } from "@/app/actions/posts/jobs";
import JobCard from "@/components/Job/jobCard";
import { JobLisitingType } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostedJob() {
  const { userId }: { userId: string } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorNoPost, setErrorNoPost] = useState(false);

  const [myPostedJobs, setMyPostedJobs] = useState<JobLisitingType[]>([]);

  useEffect(() => {
    const getUserPost = async () => {
      setLoading(true);
      try {
        const response = await GetPostByAuthorId(userId);
        if (response.status !== 200) throw new Error(response.message);
        setMyPostedJobs(response.data);
      } catch (error) {
        setErrorNoPost(true);
      } finally {
        setLoading(false);
      }
    };
    getUserPost();
  }, []);

  return (
    <>
      <div>
        {errorNoPost ? (
          <div className="w-full h-screen flex items-center justify-center">
            <p>No Post found</p>
          </div>
        ) : (
          <div className="lg:flex lg:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center ">
                <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
                  JJ
                </p>
              </div>
            ) : (
              <>
                {myPostedJobs.map((e: JobLisitingType) => {
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
                      role_name={e.role_name}
                      salary_min={e.salary_min}
                      salary_max={e.salary_max}
                      experience_level={e.experience_level}
                      apply_link={e.apply_link}
                      createdAt={e.createdAt}
                    />
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
