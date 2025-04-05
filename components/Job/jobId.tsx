"use client";

import { GetJobById } from "@/app/actions/posts/jobs";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JobDetailShow from "./jobDataShow";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobsId({ id }: { id: string }) {
  const [responseData, setResponseDataa] = useState<
    ApprovedJobLisitingType | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getPostDetails() {
      setLoading(true);
      try {
        const response: GetAllPostResponseType = await GetJobById(id);
        if (response.status !== 200) throw new Error(response.message);
        setResponseDataa(response.data[0]);
      } catch (error) {
        toast((error as Error).message || "Error Occured");
      } finally {
        setLoading(false);
      }
    }

    getPostDetails();
  }, []);

  return (
    <>
      {loading || !responseData ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <Link href={"/jobs"}>
            <ArrowLeft className="mb-4 text-gray-500 hover:text-blue-600" />
          </Link>
          <JobDetailShow {...responseData} />
        </>
      )}
    </>
  );
}
