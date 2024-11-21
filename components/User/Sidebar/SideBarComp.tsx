"use client";

import { isProfileVisitorUser } from "@/store/store";
import { useCheckForVisitor } from "@/utils/hooks/useCheckVisitor";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function SidebarComp() {
  const { userId }: { userId: string } = useParams();

  useCheckForVisitor(userId);

  const [activeTab, setActiveTab] = useState("profile");
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);

  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("profile")) setActiveTab("profile");
    if (pathname.includes("jobs/me")) setActiveTab("posts");
    if (pathname.includes("jobs/bookmarks")) setActiveTab("bookmark");
    if (pathname.includes("settings/delete")) setActiveTab("destroy");
  }, []);

  if (!session.data?.user) {
    return <div className="text-gray-400">No User found</div>;
  }

  return (
    <>
      {isVisitorUser ? (
        <Link
          href={`/user/${session.data?.user.id}/profile`}
          onClick={() => setActiveTab("profile")}
          className="min-w-40 text-center"
          aria-label="profile"
        >
          <p
            className={`text-gray-400 duration-500 ${
              activeTab === "profile"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-white"
                : ""
            }`}
          >
            My Profile
          </p>
        </Link>
      ) : (
        <Link
          href={`/user/${userId}/profile`}
          onClick={() => setActiveTab("profile")}
          className="min-w-40 text-center"
          aria-label="user-profile"
        >
          <p
            className={`text-gray-400 duration-500 ${
              activeTab === "profile"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-white"
                : ""
            }`}
          >
            Profile
          </p>
        </Link>
      )}

      {isVisitorUser ? (
        <Link
          href={`/user/${session.data?.user.id}/jobs/me`}
          onClick={() => setActiveTab("posts")}
          className="min-w-40 text-center"
          aria-label="post"
        >
          <p
            className={`mt-8 text-gray-400 duration-500 ${
              activeTab === "posts"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-white"
                : ""
            }`}
          >
            Created Jobs
          </p>
        </Link>
      ) : (
        <Link
          href={`/user/${userId}/jobs/me`}
          onClick={() => setActiveTab("posts")}
          className="min-w-40 text-center"
          aria-label="user-post"
        >
          <p
            className={`mt-8 text-gray-400 duration-500 ${
              activeTab === "posts"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-white"
                : ""
            }`}
          >
            Posted Jobs
          </p>
        </Link>
      )}

      {isVisitorUser ? (
        <>
          <Link
            href={`/user/${session.data?.user.id}/jobs/bookmarks`}
            onClick={() => setActiveTab("bookmark")}
            className="min-w-40 text-center"
            aria-label="saved"
          >
            <p
              className={`mt-8 text-gray-400 duration-500 ${
                activeTab === "bookmark"
                  ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-white"
                  : ""
              }`}
            >
              Saved Job
            </p>
          </Link>

          <Link
            href={`/user/${session.data?.user.id}/settings/delete`}
            onClick={() => setActiveTab("destroy")}
            className="min-w-40 text-center"
            aria-label="delete"
          >
            <p
              className={`mt-8 text-red-500 duration-500 ${
                activeTab === "destroy"
                  ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit"
                  : ""
              }`}
            >
              Delete Account
            </p>
          </Link>
        </>
      ) : (
        ""
      )}
    </>
  );
}
