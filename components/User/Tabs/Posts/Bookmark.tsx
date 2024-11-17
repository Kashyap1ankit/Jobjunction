"use client";

import { GetBookmarkByUserId } from "@/app/actions/posts/bookmark";
import { isProfileVisitorUser } from "@/store/store";
import { GetUserBookmarksType } from "@/types/types";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { BookmarkPostComp } from "@/components/Job/MoreDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { poppins } from "@/utils/fonts/font";
import { Link2 } from "lucide-react";
import Loader from "@/app/loading";

export default function SavedJobsComp() {
  const {
    data: { user },
  }: any = useSession();

  const { userId }: { userId: string } = useParams();

  const [loading, setLoading] = useState(false);
  const [errorNoPost, setErrorNoPost] = useState(false);

  const [bookmarkedJobs, setBookmarkedJobs] = useState<GetUserBookmarksType[]>(
    [],
  );

  const isVisitorUser = useRecoilValue(isProfileVisitorUser);

  useEffect(() => {
    if (!isVisitorUser) redirect(`/user/${userId}/profile`);
  }, []);

  useEffect(() => {
    const getBookmark = async () => {
      setLoading(true);
      try {
        const response = await GetBookmarkByUserId(user.id);
        if (response.status !== 200) throw new Error(response.message);
        setBookmarkedJobs(response.data);
      } catch (error) {
        setErrorNoPost(true);
      } finally {
        setLoading(false);
      }
    };
    getBookmark();
  }, []);
  return (
    <div>
      <>
        <div>
          {errorNoPost || bookmarkedJobs.length < 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <p className="text-white">No Bookmarks found</p>
            </div>
          ) : (
            <div className="py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
              {loading ? (
                <Loader />
              ) : (
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
                      <TableHead className="text-white">Apply Link</TableHead>
                      <TableHead className="text-white rounded-tr-md">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    className={`${poppins.className} bg-primaryBorder text-white font-bold text-gray-400`}
                  >
                    {bookmarkedJobs.map((post) => (
                      <TableRow
                        key={post.id}
                        className=" hover:bg-primaryBorder cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          #{post.id.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={post.post.company_website || "/jobs"}
                            aria-label="company_website"
                            target="_blank"
                            className="hover:text-blue-500"
                          >
                            {post.post.company}
                          </Link>
                        </TableCell>
                        <TableCell>{post.post.position}</TableCell>
                        <TableCell>
                          <Link
                            href={post.post.apply_link || "/jobs"}
                            aria-label="apply_link"
                            target="_blank"
                            className="hover:text-blue-500"
                          >
                            <Link2 />
                          </Link>
                        </TableCell>
                        <TableCell className="">
                          <BookmarkPostComp postId={post.post.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </div>
      </>
    </div>
  );
}
