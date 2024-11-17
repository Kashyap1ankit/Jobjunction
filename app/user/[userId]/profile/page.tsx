import { lazy } from "react";
const UserProfileDashboard = lazy(
  () => import("@/components/User/Tabs/Profile/Profile"),
);

export default function UserProfile() {
  return <UserProfileDashboard />;
}
