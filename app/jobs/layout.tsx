import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primaryBg mt-20">
      <Navbar />
      {children}
    </div>
  );
}
