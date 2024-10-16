import Navbar from "@/components/Navbar/Navbar";
import UserDashboardSidebar from "@/components/User/Sidebar/UserDashSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="md:flex md:p-4 max-h-screen overflow-y-scroll no-scrollbar mt-16">
        <div className="md:w-1/6 p-2 md:p-0 ">
          <UserDashboardSidebar />
        </div>

        <div className="md:w-5/6 px-3 md:px-12 ">{children}</div>
      </div>
    </>
  );
}
