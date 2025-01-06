import React, { lazy } from "react";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-20 max-w-7xl bg-primaryBg">
      <Navbar />
      {children}
    </div>
  );
}
