import { lazy } from "react";
const SignupForm = lazy(() => import("@/components/Auth/Signup"));

export default function SignUp() {
  return <SignupForm />;
}
