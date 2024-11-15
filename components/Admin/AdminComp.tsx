"use client";
import { useEffect } from "react";
import { GetAllPost } from "@/app/actions/posts/jobs";
import { toast } from "sonner";
import { GetAllPostResponseType } from "@/types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allJobListings,
  joblistingError,
  universalLoader,
} from "@/store/store";

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
import { DeletePostComp } from "@/components/Job/MoreDialog";

import Image from "next/image";
import Loader from "@/app/loading";

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
            <Loader />
          ) : (
            <>
              <Table>
                <TableHeader className="">
                  <TableRow
                    className={`${poppins.className} bg-gray-700 text-white font-bold hover:bg-gray-700`}
                  >
                    <TableHead className="text-white rounded-tl-md">
                      Id
                    </TableHead>
                    <TableHead className="text-white">Company</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-white">Posted By</TableHead>
                    <TableHead className="text-white">CreatedAt</TableHead>
                    <TableHead className="text-white rounded-tr-md">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className={`${poppins.className} bg-primaryBorder text-white font-bold text-gray-400`}
                >
                  {allJobs.map((post) => (
                    <TableRow
                      key={post.id}
                      className=" hover:bg-primaryBorder cursor-pointer"
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
                      <TableCell className="">
                        <DeletePostComp
                          postId={post.id}
                          authorId={post.author.id}
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
