import { lazy } from "react";

const AllUser = lazy(() => import("@/components/Admin/Users/Users"));

export default function AdminUserPage() {
  return <AllUser />;
}
