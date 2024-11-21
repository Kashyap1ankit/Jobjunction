"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSideBarComp() {
  const [activeTab, setActiveTab] = useState("profile");
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/admin")) setActiveTab("admin");
    if (pathname.includes("/admin/users/all")) setActiveTab("users");
  }, []);

  if (!session.data?.user) {
    return <div className="text-gray-400">No User found</div>;
  }

  return (
    <div>
      <>
        <Link
          href={`/admin`}
          onClick={() => setActiveTab("admin")}
          className="min-w-40 text-center"
          aria-label="admin"
        >
          <p
            className={`text-gray-400 duration-500 ${
              activeTab === "admin"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-sideBarColor"
                : ""
            }`}
          >
            All Posts
          </p>
        </Link>

        <Link
          href={`/admin/users/all`}
          onClick={() => setActiveTab("users")}
          className="min-w-40 text-center"
          aria-label="admin-user"
        >
          <p
            className={`mt-8 text-gray-400 duration-500 ${
              activeTab === "users"
                ? "w-fit w-full rounded-full bg-secondaryBorder p-2 font-kanit text-sideBarColor"
                : ""
            }`}
          >
            All Users
          </p>
        </Link>
      </>
    </div>
  );
}
