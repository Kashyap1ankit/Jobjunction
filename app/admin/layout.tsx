import React, { lazy } from "react";
const AdminSideBar = lazy(() => import("@/components/Admin/AdminSideBar"));
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="no-scrollbar mt-16 max-h-screen overflow-y-scroll md:flex md:p-4">
        <div className="p-2 md:w-1/6 md:p-0">
          <AdminSideBar />
        </div>
        <div className="px-3 md:w-5/6 md:px-12">{children}</div>
      </div>
    </>
  );
}
