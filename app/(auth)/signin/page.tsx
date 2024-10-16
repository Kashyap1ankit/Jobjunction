import { lazy } from "react";
const SigninForm = lazy(() => import("@/components/Auth/Signin"));

export default async function SignIn() {
  return <SigninForm />;
}
