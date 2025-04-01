import ActivePostModal from "@/components/Job/activeJobModal";
import { lazy } from "react";
// const MobileFilterCard = lazy(() => import("@/components/Job/mobFilterCard"));
// const DesktopFilterCard = lazy(() => import("@/components/Job/deskFilterCard"));
const AllJobsComp = lazy(() => import("@/components/Job/Jobs"));

export default function AllJobs() {
  return (
    <div className="lg:flex lg:gap-8">
      {/* <DesktopFilterCard />

      <MobileFilterCard /> */}

      <div className="max-h-screen overflow-y-scroll lg:w-1/2">
        <AllJobsComp />
      </div>

      <div className="mt-10 hidden md:block lg:w-1/2">
        <ActivePostModal />
      </div>
    </div>
  );
}
