"use client";

import {
  allJobListings,
  filterMobSheet,
  joblistingError,
  universalLoader,
} from "@/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const experienceValues = ["Fresher", "0-1y", "1y", "3y", "5y"];
const jobTypeValues = ["Fulltime", "Internship", "Contract", "Freelance"];
const locationTypeValue = ["Remote", "Onsite", "Hybrid"];

export default function FilterSideBar() {
  const { register, watch } = useForm();
  const setAllJobs = useSetRecoilState(allJobListings);
  const setLoading = useSetRecoilState(universalLoader);
  const setError = useSetRecoilState(joblistingError);
  const setMobSheetOpen = useSetRecoilState(filterMobSheet);
  const [disableApply, setDisableApply] = useState(true);

  const [filter, setFilter] = useState<{
    experience: any[];
    job: any[];
    location: any[];
  }>({
    experience: [],
    job: [],
    location: [],
  });

  const selectedExperience = watch(experienceValues);
  const selectedJob = watch(jobTypeValues);
  const selectedLocation = watch(locationTypeValue);

  useEffect(() => {
    const newFilter = {
      experience: selectedExperience.filter((e) => (e ? e : null)),
      job: selectedJob.filter((e) => (e ? e : null)),
      location: selectedLocation.filter((e) => (e ? e : null)),
    };
    if (JSON.stringify(newFilter) !== JSON.stringify(filter)) {
      setFilter(newFilter);
      setDisableApply(false);
    }
  }, [selectedExperience, selectedJob, selectedLocation]);

  const callBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs`, {
        method: "POST",
        body: JSON.stringify(filter),
      });

      const finalData = await response.json();

      if (finalData.status !== 200) throw new Error(finalData.message);
      setError(false);
      setAllJobs(finalData.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full px-4">
        <Button
          className={`mt-4 w-full bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue text-white hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
          onClick={() => {
            setMobSheetOpen(false);
            callBackend();
          }}
          disabled={disableApply}
          aria-label="apply"
        >
          Apply
        </Button>
      </div>

      <Accordion
        type="single"
        collapsible
        className="rounded-lg border-2 border-primaryBorder bg-secondaryBorder px-2 py-4 lg:p-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-bold">
            Experience Level
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-x-8">
            {experienceValues.map((e: string, i: number) => {
              return (
                <div className="mt-4 flex gap-2" key={i}>
                  <input
                    type="checkbox"
                    value={e}
                    {...register(e)}
                    className="cursor-pointer accent-green-700"
                  />
                  <label className="text-gray-400">{e}</label>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <div className="py-4 px-2 lg:p-6 border-2 border-primaryBorder bg-primaryBorder rounded-lg">
        <p className="font-bold text-left ">Experience Level</p>
        <div className="grid grid-cols-2  gap-x-8">
          {experienceValues.map((e: string, i: number) => {
            return (
              <div className="flex gap-2 mt-4" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register(e)}
                  className="accent-green-700 cursor-pointer"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </div>
      </div> */}

      <Accordion
        type="single"
        collapsible
        className="rounded-lg border-2 border-primaryBorder bg-secondaryBorder px-2 py-4 lg:p-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-bold">
            Job Type
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-x-8">
            {jobTypeValues.map((e: string, i: number) => {
              return (
                <div className="mt-4 flex gap-2" key={i}>
                  <input
                    type="checkbox"
                    value={e}
                    {...register(e)}
                    className="accent-green-700"
                  />
                  <label className="text-gray-400">{e}</label>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <div className="py-4 px-2 lg:p-6 border-2 border-primaryBorder bg-primaryBorder rounded-lg">
        <p className="font-bold text-left">Job Type</p>
        <div className="grid grid-cols-2  gap-x-8">
          {jobTypeValues.map((e: string, i: number) => {
            return (
              <div className="flex gap-2 mt-4" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register(e)}
                  className="accent-green-700"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </div>
      </div> */}

      <Accordion
        type="single"
        collapsible
        className="rounded-lg border-2 border-primaryBorder bg-secondaryBorder px-2 py-4 lg:p-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-bold">
            Location
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-x-8">
            {locationTypeValue.map((e: string, i: number) => {
              return (
                <div className="mt-4 flex gap-2" key={i}>
                  <input
                    type="checkbox"
                    value={e}
                    {...register(e)}
                    className="accent-green-700"
                  />
                  <label className="text-gray-400">{e}</label>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* 
      <div className="py-4 px-2 lg:p-6 border-2 border-primaryBorder bg-primaryBorder rounded-lg">
        <p className="font-bold text-left">Location Wise</p>
        <div className="grid grid-cols-2  gap-x-8">
          {locationTypeValue.map((e: string, i: number) => {
            return (
              <div className="flex gap-2 mt-4" key={i}>
                <input
                  type="checkbox"
                  value={e}
                  {...register(e)}
                  className="accent-green-700"
                />
                <label className="text-gray-400">{e}</label>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
}
