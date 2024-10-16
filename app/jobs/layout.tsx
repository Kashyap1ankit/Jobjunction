import React, { lazy } from "react";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primaryBg mt-20">
      <Navbar />
      {children}
    </div>
  );
}
