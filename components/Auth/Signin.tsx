"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SigninInputType, signinSchema } from "@/schema/auth";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import { fraunces, poppins } from "@/utils/fonts/font";
import { IoArrowBack } from "react-icons/io5";
import TextDivider from "../ui/text-divider";

export default function SigninForm() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SigninInputType>({
    resolver: zodResolver(signinSchema),
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [passwordClick, setPasswordClick] = useState<boolean>(false);

  async function onSubmit(data: any) {
    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast("Username / Password mismatched");
      } else {
        window.location.href = res?.url || "/jobs";
      }
    } catch (error) {
      toast((error as Error).message);
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-6 flex w-11/12 flex-col gap-6 rounded-lg border-2 border-slate-800 bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg p-4 sm:w-3/4 md:mt-24 md:mt-8 md:w-1/2 md:p-6 lg:mt-20 xl:w-1/3">
        <div>
          <Link href={"/"} aria-label="go-back">
            <IoArrowBack className="mb-4 size-6 cursor-pointer text-gray-400 hover:text-white" />
          </Link>
          <p
            className={`${poppins.className} mb-2 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl`}
          >
            Welcome Back !
          </p>
          <p
            className={`${poppins.className} sm:text-md text-center text-sm font-bold text-gray-500`}
          >
            Continue your journey with jobjunction
          </p>
        </div>

        <Button
          className="flex w-full gap-4 bg-white hover:bg-white"
          onClick={() => signIn("google", { callbackUrl: "/jobs" })}
          aria-label="signin"
        >
          <FcGoogle className="size-6" />
          <p className={`${poppins.className} font-bold text-black`}>
            Signin With Google
          </p>
        </Button>

        <TextDivider>Or</TextDivider>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-y-8">
            <div>
              <div className="flex w-full items-center gap-2 rounded-md bg-inputBg p-4">
                <AtSign className="size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-inputBg text-white outline-none"
                  {...register("username")}
                />
              </div>
              {errors.username?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex w-full items-center gap-2 rounded-md bg-inputBg p-4">
                <Lock className="size-5 text-gray-400" />
                <input
                  type={passwordClick ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-inputBg text-white outline-none"
                  {...register("password")}
                />
                <div onClick={() => setPasswordClick((prev) => !prev)}>
                  {passwordClick ? (
                    <Eye className="size-5 cursor-pointer text-gray-400" />
                  ) : (
                    <EyeOff className="size-5 cursor-pointer text-gray-400" />
                  )}
                </div>
              </div>
              {errors.password?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
              aria-label="signup"
            >
              {submitting ? (
                <TbFidgetSpinner className="animate-spin text-2xl" />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          New User ?
          <Link href="/signup" aria-label="signup">
            <span className="cursor-pointer text-secondarySkyBlue">
              {" "}
              Create Account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
