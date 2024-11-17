"use client";

import { Bookmark, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";

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
      } catch (error) {
        setBookmarked(false);
      }
    };

    checkForBookmarkedPost();
  }, []);

  return (
    <>
      <div className="flex gap-2">
        <div onClick={() => handleBookmarkClick()}>
          <Bookmark
            className={`size-4 md:size-6 cursor-pointer ${
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
}: {
  postId: string;
  authorId: string;
}) {
  const session: any = useSession();
  const router = useRouter();
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
          <Trash2 className=" size-4 md:size-6 cursor-pointer text-red-600" />
        </div>
      ) : null}
    </div>
  );
}
