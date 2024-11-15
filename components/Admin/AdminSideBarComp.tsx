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
            className={` duration-500 text-gray-400 ${
              activeTab === "admin"
                ? "bg-secondaryBorder text-sideBarColor w-fit p-2 rounded-full  font-kanit w-full "
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
            className={`mt-8 duration-500 text-gray-400 ${
              activeTab === "users"
                ? "bg-secondaryBorder text-sideBarColor w-fit p-2 rounded-full  font-kanit w-full "
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
