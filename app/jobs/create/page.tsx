import { lazy } from "react";

const CreateForm = lazy(() => import("@/components/Job/Create/CreateForm"));

export default function CreateJob() {
  return <CreateForm />;
}
