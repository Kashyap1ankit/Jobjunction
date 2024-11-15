import { lazy } from "react";
const SavedJobsComp = lazy(
  () => import("@/components/User/Tabs/Posts/Bookmark")
);

export default function MySavedJobs() {
  return <SavedJobsComp />;
}
