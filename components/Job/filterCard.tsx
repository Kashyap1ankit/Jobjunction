"use client";

import {
  allJobListings,
  joblistingError,
  universalLoader,
} from "@/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClearFilterBtn from "./clearFIlterBtn";

const experienceValues = ["Fresher", "0-1y", "1y", "3y", "5y"];
const jobTypeValues = ["Fulltime", "Internship", "Contract", "Freelance"];
const locationTypeValue = ["Remote", "Onsite", "Hybrid"];

type filteredArrayType = {
  experience: any[];
  job: any[];
  location: any[];
};
export default function FilterSideBar() {
  const { register, watch, reset } = useForm();
  const setAllJobs = useSetRecoilState(allJobListings);
  const setLoading = useSetRecoilState(universalLoader);
  const setError = useSetRecoilState(joblistingError);

  const [filter, setFilter] = useState<filteredArrayType>({
    experience: [],
    job: [],
    location: [],
  });

  const selectedExperience = watch("experience") || [];
  const selectedJob = watch("job_type") || [];
  const selectedLocation = watch("location") || [];

  useEffect(() => {
    const newFilter = {
      experience: selectedExperience.filter((e: string | null) =>
        e ? e : null,
      ),
      job: selectedJob.filter((e: string | null) => (e ? e : null)),
      location: selectedLocation.filter((e: string | null) => (e ? e : null)),
    };

    if (JSON.stringify(newFilter) !== JSON.stringify(filter)) {
      setFilter(newFilter);
      callBackend(newFilter);
    }
  }, [selectedExperience, selectedJob, selectedLocation]);

  const callBackend = async (newFilter?: filteredArrayType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs`, {
        method: "POST",
        body: JSON.stringify(newFilter ? newFilter : filter),
      });
      const finalData = await response.json();

      if (finalData.status !== 200) throw new Error(finalData.message);
      setError(false);
      setAllJobs(finalData.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-22 fixed left-0 z-50 flex w-full justify-center gap-4 overflow-x-scroll bg-primaryBorder px-4 py-2 md:gap-12 md:px-0 lg:py-4">
      <Select>
        <SelectTrigger className="w-80 border-0 bg-primaryBg text-gray-400 focus:ring-offset-0 md:w-40">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent className="w-64 border-0 bg-primaryBg px-2 focus:ring-offset-0 md:w-fit">
          <ClearFilterBtn
            fn={() => {
              reset({
                experience: [],
                job_type: watch("job_type"),
                location: watch("location"),
              });
            }}
          />

          {experienceValues.map((e: string, i: number) => {
            return (
              <div className="mt-4 flex gap-2" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register("experience")}
                  className="cursor-pointer accent-green-700"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-80 border-0 bg-primaryBg text-gray-400 focus:ring-offset-0 md:w-40">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent className="w-64 border-0 bg-primaryBg px-2 focus:ring-offset-0 md:w-fit">
          <ClearFilterBtn
            fn={() => {
              reset({
                experience: watch("experience"),
                job_type: [],
                location: watch("location"),
              });
            }}
          />

          {jobTypeValues.map((e: string, i: number) => {
            return (
              <div className="mt-4 flex gap-2" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register("job_type")}
                  className="accent-green-700"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-80 border-0 bg-primaryBg text-gray-400 focus:ring-offset-0 md:w-40">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent className="w-64 border-0 bg-primaryBg px-2 focus:ring-offset-0 md:w-fit">
          <ClearFilterBtn
            fn={() => {
              reset({
                experience: watch("experience"),
                job_type: watch("job_type"),
                location: [],
              });
            }}
          />

          {locationTypeValue.map((e: string, i: number) => {
            return (
              <div className="mt-4 flex gap-2" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register("location")}
                  className="accent-green-700"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
