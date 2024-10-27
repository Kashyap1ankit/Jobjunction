"use client";

import { GetBookmarkByUserId } from "@/app/actions/posts/bookmark";
import { isProfileVisitorUser } from "@/store/store";
import { GetUserBookmarksType } from "@/types/types";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";
import MoreOptionDialog from "@/components/Job/MoreDialog";

export default function SavedJobsComp() {
  const {
    data: { user },
  }: any = useSession();

  const { userId }: { userId: string } = useParams();

  const [loading, setLoading] = useState(false);
  const [errorNoPost, setErrorNoPost] = useState(false);

  const [bookmarkedJobs, setBookmarkedJobs] = useState<GetUserBookmarksType[]>(
    []
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
          {errorNoPost ? (
            <div className="w-full h-screen flex items-center justify-center">
              <p>No Bookmarks found</p>
            </div>
          ) : (
            <div className="py-6 h-screen max-h-screen overflow-y-scroll no-scrollbar ">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center ">
                  <p className="bg-white border-2 border-b-8 border-r-8 border-black p-4 rounded-md font-bold animate-bounce ">
                    JJ
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-8 ">
                  {bookmarkedJobs.map((e: GetUserBookmarksType) => {
                    return (
                      <div
                        className="flex flex-row justify-between mt-4 lg:mt-0 p-4 md:p-6 shadow-lg mx-auto w-11/12  lg:w-2/3 bg-primaryBorder rounded-lg border-2 border-primaryBorder"
                        key={e.id}
                        id={e.id}
                      >
                        {/* first section  */}

                        <div className="flex gap-4">
                          <HoverCard>
                            <HoverCardTrigger>
                              <Avatar className="cursor-pointer size-8 md:size-10">
                                <AvatarImage
                                  src={
                                    e.post.author.avatar
                                      ? e.post.author.avatar
                                      : "/Images/avatar.png"
                                  }
                                />
                                <AvatarFallback>CO</AvatarFallback>
                              </Avatar>
                            </HoverCardTrigger>
                            <HoverCardContent className="flex gap-2 items-center">
                              <p>{e.post.author.username}</p>
                              <Link
                                href={`/user/${e.post.author.id}/profile`}
                                aria-label="user-profile"
                              >
                                <HiExternalLink />
                              </Link>
                            </HoverCardContent>
                          </HoverCard>

                          <div>
                            <p className="text-radio text-sm md:text-xl text-white tracking-wide font-bold">
                              {e.post.position}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {e.post.company}
                            </p>
                          </div>
                        </div>

                        <MoreOptionDialog
                          postId={e.post.id}
                          authorId={e.post.author.id}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </>
    </div>
  );
}
