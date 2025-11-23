"use client";

import { Bookmark, CircleX, Trash2 } from "lucide-react";
import { useEffect } from "react";

import {
  CheckForBookmark,
  HandleBookmakrClick,
} from "@/app/actions/posts/bookmark";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useAllJobListings, useBookmarkStore } from "@/store/store";

import { DestroyPost } from "@/app/actions/posts/jobs";
import { ApprovedJobLisitingType } from "@/types/types";

export function BookmarkPostComp({ postId }: { postId: string }) {
  // const [bookmarked, setBookmarked] = useRecoilState(bookmarkedPosts(postId));
  const bookmarked = useBookmarkStore(
    (s) => s.bookmarkedPosts[postId] ?? false,
  );
  const setBookmarked = useBookmarkStore((s) => s.setBookmarked);
  const session: any = useSession();

  async function handleBookmarkClick() {
    try {
      const response = await HandleBookmakrClick(
        session.data?.user?.id,
        postId,
      );
      if (response.status !== 200) throw new Error(response.message);
      setBookmarked(postId, true);

      toast(response.message);
    } catch (error) {
      setBookmarked(postId, false);
      toast((error as Error).message);
    }
  }

  useEffect(() => {
    const checkForBookmarkedPost = async () => {
      try {
        const response = await CheckForBookmark(session.data?.user?.id, postId);
        if (response.status !== 200) throw new Error(response.message);
        setBookmarked(postId, true);
      } catch {
        setBookmarked(postId, false);
      }
    };

    checkForBookmarkedPost();
  }, []);

  return (
    <>
      <div className="flex gap-2">
        <div
          onClick={(e: any) => {
            e.stopPropagation();

            handleBookmarkClick();
          }}
        >
          <Bookmark
            className={`size-4 cursor-pointer md:size-6 ${
              bookmarked ? "fill-white" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
}

export function DeletePostComp({
  postId,
  authorId,
  cross,
}: {
  postId: string;
  authorId: string;
  cross?: boolean;
}) {
  const session: any = useSession();
  // const setAllJobs = useSetRecoilState(allJobListings);
  const { setAllJobs } = useAllJobListings();

  async function handlePostDelete() {
    try {
      const response = await DestroyPost(postId, session.data.user.id);

      if (response.status !== 201) throw new Error(response.message);
      toast("Deleted Successfully");
      //@ts-expect-error type not define
      setAllJobs((prev) => {
        const filteredArray = prev.filter(
          (e: ApprovedJobLisitingType) => e.id !== postId,
        );
        return filteredArray;
      });
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <div>
      {session.data?.user.id === authorId ||
      session.data?.user.role === "ADMIN" ? (
        <div onClick={() => handlePostDelete()}>
          {cross ? (
            <CircleX className="text-red-500" />
          ) : (
            <Trash2 className="size-4 cursor-pointer text-red-600 md:size-6" />
          )}
        </div>
      ) : null}
    </div>
  );
}
