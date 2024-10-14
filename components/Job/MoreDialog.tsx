"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis, Bookmark, X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import {
  CheckForBookmark,
  HandleBookmakrClick,
} from "@/app/actions/posts/bookmark";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { bookmarkedPosts } from "@/store/store";
import { useRecoilState } from "recoil";
import { DestroyPost } from "@/app/actions/posts/jobs";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MoreOptionDialog({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarked, setBookmarked] = useRecoilState(bookmarkedPosts(postId));
  const [showBookmarkToast, setShowBookmarkToast] = useState({
    status: false,
    message: "",
  });
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState({
    status: false,
    message: "",
  });
  const [bookmarking, setBookmarking] = useState(false);

  const session: any = useSession();
  const router = useRouter();

  async function handleBookmarkClick() {
    setBookmarking(true);
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
      setBookmarking(false);
      setTimeout(() => {
        setShowBookmarkToast({
          status: false,
          message: "",
        });
      }, 1000);
    }
  }

  async function handlePostDelete() {
    setDeleting(true);
    try {
      const response = await DestroyPost(postId, session.data.user.id);

      if (response.status !== 201) throw new Error(response.message);
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 1000);
      setModalOpen(false);
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
      setDeleting(false);
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
      {showBookmarkToast.status && toast(showBookmarkToast.message)}
      {deleted && toast("Deleted Successfully")}
      {deleteError.status && toast(deleteError.message)}

      <Dialog open={modalOpen}>
        <DialogTrigger>
          <Ellipsis onClick={() => setModalOpen(true)} />
        </DialogTrigger>
        <DialogContent className="max-w-[250px] rounded-md md:max-w-[400px]">
          <DialogHeader>
            <div className="w-full flex flex-row-reverse">
              <X
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>

            <DialogDescription>
              <div className=" w-full mb-4 cursor-pointer ">
                {bookmarking ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  <div
                    onClick={() => handleBookmarkClick()}
                    className="flex gap-2 w-full items-center justify-center"
                  >
                    <Bookmark
                      className={`cursor-pointer ${
                        bookmarked ? "fill-blue-950" : ""
                      }`}
                    />
                    <p className="text-md">
                      {bookmarked ? "Unbookmarked" : "Bookmark"}
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {session.data?.user.id === authorId ||
              session.data?.user.role === "ADMIN" ? (
                <div className=" w-full my-4  ">
                  {deleting ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    <div
                      className="flex gap-2 w-full items-center my-4 justify-center cursor-pointer"
                      onClick={() => handlePostDelete()}
                    >
                      <Trash2 className="cursor-pointer" />
                      <p className="text-md text-red-500">Delete Post</p>
                    </div>
                  )}
                </div>
              ) : null}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
