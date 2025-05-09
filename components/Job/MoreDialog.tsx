"use client";

import { Bookmark, CircleX, Trash2 } from "lucide-react";
import { useEffect } from "react";

import {
  CheckForBookmark,
  HandleBookmakrClick,
} from "@/app/actions/posts/bookmark";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { allJobListings, bookmarkedPosts } from "@/store/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DestroyPost } from "@/app/actions/posts/jobs";

export function BookmarkPostComp({ postId }: { postId: string }) {
  const [bookmarked, setBookmarked] = useRecoilState(bookmarkedPosts(postId));
  const session: any = useSession();

  async function handleBookmarkClick() {
    try {
      const response = await HandleBookmakrClick(
        session.data?.user?.id,
        postId,
      );
      if (response.status !== 200) throw new Error(response.message);
      setBookmarked(true);

      toast(response.message);
    } catch (error) {
      setBookmarked(false);
      toast((error as Error).message);
    }
  }

  useEffect(() => {
    const checkForBookmarkedPost = async () => {
      try {
        const response = await CheckForBookmark(session.data?.user?.id, postId);
        if (response.status !== 200) throw new Error(response.message);
        setBookmarked(true);
      } catch {
        setBookmarked(false);
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
  const setAllJobs = useSetRecoilState(allJobListings);

  async function handlePostDelete() {
    try {
      const response = await DestroyPost(postId, session.data.user.id);

      if (response.status !== 201) throw new Error(response.message);
      toast("Deleted Successfully");
      setAllJobs((prev) => {
        const filteredArray = prev.filter((e) => e.id !== postId);
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
