import { lazy } from "react";
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
const UserDashboardSidebar = lazy(
  () => import("@/components/User/Sidebar/UserDashSidebar"),
);

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="no-scrollbar mt-16 max-h-screen overflow-y-scroll md:flex md:p-4">
        <div className="p-2 md:w-1/6 md:p-0">
          <UserDashboardSidebar />
        </div>

        <div className="px-3 md:w-5/6 md:px-12">{children}</div>
      </div>
    </>
  );
}
