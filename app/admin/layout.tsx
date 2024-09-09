import AdminSideBar from "@/components/Admin/AdminSideBar";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="md:flex md:p-4 border-t-2 max-h-screen overflow-y-scroll no-scrollbar">
        <div className="md:w-1/6 p-2 md:p-0">
          <AdminSideBar />
        </div>
        <div className="md:w-5/6 px-3 md:px-12 ">{children}</div>
      </div>
    </>
  );
}
