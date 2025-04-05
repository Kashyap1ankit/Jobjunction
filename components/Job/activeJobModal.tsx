"use client";

import { GetJobById } from "@/app/actions/posts/jobs";
import { universalActivePostModal } from "@/store/store";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import JobDetailShow from "./jobDataShow";

export default function ActivePostModal() {
  const activeJobModalId = useRecoilValue(universalActivePostModal);
  const [currentData, setCurrentData] = useState<
    ApprovedJobLisitingType | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPostDetails() {
      setLoading(true);
      try {
        const response: GetAllPostResponseType =
          await GetJobById(activeJobModalId);
        if (response.status !== 200) throw new Error(response.message);
        setCurrentData(response.data[0]);
      } catch (error) {
        toast((error as Error).message || "Error Occured");
      } finally {
        setLoading(false);
      }
    }

    getPostDetails();
  }, [activeJobModalId]);

  return (
    <>
      {loading || !currentData ? (
        <div className="text-white">Loading...</div>
      ) : (
        <JobDetailShow {...currentData} />
      )}
    </>
  );
}
