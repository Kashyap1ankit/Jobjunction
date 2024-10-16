import { lazy } from "react";
const AdminComp = lazy(() => import("@/components/Admin/AdminComp"));

export default function Admin() {
  return <AdminComp />;
}
