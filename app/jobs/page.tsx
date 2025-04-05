import ActivePostModal from "@/components/Job/activeJobModal";
import FilterSideBar from "@/components/Job/filterCard";
import { lazy } from "react";

const AllJobsComp = lazy(() => import("@/components/Job/Jobs"));

export default function AllJobs() {
  return (
    <>
      <FilterSideBar />
      <div className="lg:flex lg:gap-8">
        <div className="max-h-screen overflow-y-scroll lg:w-2/5 xl:w-1/2">
          <AllJobsComp />
        </div>

        <div className="mt-24 hidden lg:block lg:w-1/2">
          <ActivePostModal />
        </div>
      </div>
    </>
  );
}
