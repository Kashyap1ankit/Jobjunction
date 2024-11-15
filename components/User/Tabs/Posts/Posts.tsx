"use client";

import { GetPostByAuthorId } from "@/app/actions/posts/jobs";
import { GetUserPostedJobsType } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { isProfileVisitorUser } from "@/store/store";
import { useRecoilValue } from "recoil";
import Loader from "@/app/loading";

export default function PostedJob() {
  const { userId }: { userId: string } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorNoPost, setErrorNoPost] = useState(false);

  const [myPostedJobs, setMyPostedJobs] = useState<GetUserPostedJobsType[]>([]);
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);

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
        {errorNoPost || myPostedJobs.length < 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <p className="text-white">No Post found</p>
          </div>
        ) : (
          <div className="lg:flex lg:flex-col gap-8 py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
            {loading ? (
              <Loader />
            ) : (
              <>
                {isVisitorUser ? (
                  <div className="flex justify-end mb-4">
                    <Link href={"/jobs/create"}>
                      <Button className="flex gap-2 items-center bg-gradient-to-b from-primarySkyBlue to-secondarySkyBlue">
                        <PlusIcon />
                        <p>Add Post</p>
                      </Button>
                    </Link>
                  </div>
                ) : null}
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
                      <TableHead className="text-white">CreatedAt</TableHead>
                      <TableHead className="text-white rounded-tr-md">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    className={`${poppins.className} bg-primaryBorder text-white font-bold text-gray-400`}
                  >
                    {myPostedJobs.map((post) => (
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
      </div>
    </>
  );
}
