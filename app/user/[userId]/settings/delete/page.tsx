import { lazy } from "react";
const DeleteComp = lazy(
  () => import("@/components/User/Tabs/Settings/DeleteComp"),
);

export default function DestoryAccount() {
  return <DeleteComp />;
}
