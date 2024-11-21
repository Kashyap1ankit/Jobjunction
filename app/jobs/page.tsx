import { lazy } from "react";
const MobileFilterCard = lazy(() => import("@/components/Job/mobFilterCard"));
const DesktopFilterCard = lazy(() => import("@/components/Job/deskFilterCard"));
const AllJobsComp = lazy(() => import("@/components/Job/Jobs"));

export default function AllJobs() {
  return (
    <div className="lg:flex lg:gap-8">
      <DesktopFilterCard />

      <MobileFilterCard />

      <div className="lg:w-4/5">
        <AllJobsComp />
      </div>
    </div>
  );
}
