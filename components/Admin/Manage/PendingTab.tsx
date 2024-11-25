"use client";
import { useEffect, useState } from "react";
import { ApproveJob, GetAllPost } from "@/app/actions/posts/jobs";
import { toast } from "sonner";
import { ApprovedJobLisitingType, GetAllPostResponseType } from "@/types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { joblistingError, universalLoader } from "@/store/store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { poppins } from "@/utils/fonts/font";
import Link from "next/link";

import Image from "next/image";
import Loader from "@/app/loading";
import { CircleCheck } from "lucide-react";
import { SendNotification } from "@/app/actions/notification";
import { DeletePostComp } from "@/components/Job/MoreDialog";

export default function PendingPostsComp() {
  const [allJobs, setAllJobs] = useState<ApprovedJobLisitingType[] | []>([]);
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

  async function handleApproveJob(id: string, company: string) {
    try {
      const response = await ApproveJob(id);
      if (response.status !== 200) throw new Error(response.message);

      setAllJobs((prev) => {
        const filteredArray = prev.filter((e) => e.id !== id);
        return filteredArray;
      });

      toast.success("Job Approved", {
        style: {
          backgroundColor: "#65a30d",
          color: "white",
          borderColor: "#65a30d",
        },
      });

      await SendNotification(company);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <>
      {errorNoPost || allJobs.length <= 0 ? (
        <div className="flex h-screen max-h-screen w-full items-center justify-center text-white">
          <p>No Post found</p>
        </div>
      ) : (
        <div className="no-scrollbar h-screen max-h-screen gap-8 overflow-y-scroll bg-transparent py-6 md:flex md:flex-col">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Table>
                <TableHeader className="">
                  <TableRow
                    className={`${poppins.className} bg-gray-700 font-bold text-white hover:bg-gray-700`}
                  >
                    <TableHead className="rounded-tl-md text-white">
                      Id
                    </TableHead>
                    <TableHead className="text-white">Company</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-white">Posted By</TableHead>
                    <TableHead className="text-white">CreatedAt</TableHead>
                    <TableHead className="rounded-tr-md text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className={`${poppins.className} bg-primaryBorder font-bold text-gray-400 text-white`}
                >
                  {allJobs.map((post) => (
                    <TableRow
                      key={post.id}
                      className="cursor-pointer hover:bg-primaryBorder"
                    >
                      <TableCell className="font-medium">
                        #{post.id.slice(0, 5)}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={post.company_website || "/jobs"}
                          aria-label="company_website"
                          target="_blank"
                          className="hover:text-blue-500"
                        >
                          {post.company}
                        </Link>
                      </TableCell>
                      <TableCell>{post.position}</TableCell>
                      <TableCell>
                        <Link
                          href={`/user/${post.author.id}/profile` || "/jobs"}
                          aria-label="company_website"
                          target="_blank"
                          className="hover:text-blue-500"
                        >
                          <Image
                            src={post.author.avatar || "/Images/avatar.png"}
                            width={500}
                            height={500}
                            alt="avatar"
                            aria-label="user-avatar"
                            className="w-12 rounded-full"
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        {post.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <CircleCheck
                          className="text-green-500"
                          onClick={() =>
                            handleApproveJob(post.id, post.company)
                          }
                        />
                        <DeletePostComp
                          postId={post.id}
                          authorId={post.author.id}
                          cross={true}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      )}
    </>
  );
}
