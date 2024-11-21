import React, { lazy } from "react";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20 bg-primaryBg">
      <Navbar />
      {children}
    </div>
  );
}
