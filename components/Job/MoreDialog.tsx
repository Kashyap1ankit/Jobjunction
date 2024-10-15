"use client";

import { Bookmark, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CheckForBookmark,
  HandleBookmakrClick,
} from "@/app/actions/posts/bookmark";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { bookmarkedPosts } from "@/store/store";
import { useRecoilState } from "recoil";
import { DestroyPost } from "@/app/actions/posts/jobs";
import { useRouter } from "next/navigation";

export default function MoreOptionDialog({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) {
  const [bookmarked, setBookmarked] = useRecoilState(bookmarkedPosts(postId));
  const [showBookmarkToast, setShowBookmarkToast] = useState({
    status: false,
    message: "",
  });

  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState({
    status: false,
    message: "",
  });

  const session: any = useSession();
  const router = useRouter();

  async function handleBookmarkClick() {
    try {
      const response = await HandleBookmakrClick(
        session.data?.user?.id,
        postId
      );
      if (response.status !== 200) throw new Error(response.message);
      setBookmarked(true);
      setShowBookmarkToast({
        status: true,
        message: response.message,
      });
    } catch (error) {
      setBookmarked(false);
      setShowBookmarkToast({
        status: true,
        message: (error as Error).message,
      });
    } finally {
      setTimeout(() => {
        setShowBookmarkToast({
          status: false,
          message: "",
        });
      }, 100);
    }
  }

  async function handlePostDelete() {
    try {
      const response = await DestroyPost(postId, session.data.user.id);

      if (response.status !== 201) throw new Error(response.message);
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 1000);

      router.refresh();
    } catch (error) {
      setDeleteError({
        status: true,
        message: (error as Error).message,
      });
      setTimeout(() => {
        setDeleteError({
          status: false,
          message: "",
        });
      }, 1000);
    } finally {
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
      {showBookmarkToast.status ? toast(showBookmarkToast.message) : null}
      {deleted && toast("Deleted Successfully")}
      {deleteError.status && toast(deleteError.message)}

      <div className="flex gap-2">
        {session.data?.user.id === authorId ||
        session.data?.user.role === "ADMIN" ? (
          <div onClick={() => handlePostDelete()}>
            <Trash2 className=" size-4 md:size-6 cursor-pointer" />
          </div>
        ) : null}

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
