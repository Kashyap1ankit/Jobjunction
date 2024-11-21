import { lazy } from "react";
const PostedJob = lazy(() => import("@/components/User/Tabs/Posts/Posts"));
export default function MyPosts() {
  return <PostedJob />;
}
