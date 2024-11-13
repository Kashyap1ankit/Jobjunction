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
      toast("Username / Password mismatched");
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto rounded-lg p-4 md:p-6 w-11/12 sm:w-3/4 md:w-1/2 xl:w-1/3 bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg mt-6 md:mt-8 lg:mt-20 md:mt-24 border-2 border-slate-800 flex flex-col gap-6">
        <div>
          <Link href={"/"} aria-label="go-back">
            <IoArrowBack className="text-gray-400 size-6 cursor-pointer mb-4 hover:text-white" />
          </Link>
          <p
            className={`${poppins.className} text-2xl sm:text-3xl md:text-4xl mb-2 text-center text-white font-bold `}
          >
            Welcome Back !
          </p>
          <p
            className={`${poppins.className} text-sm sm:text-md text-center text-gray-500 font-bold`}
          >
            Continue your journey with jobjunction
          </p>
        </div>

        <Button
          className="bg-white w-full flex gap-4 hover:bg-white"
          onClick={() => signIn("google", { callbackUrl: "/jobs" })}
          aria-label="signin"
        >
          <FcGoogle className="size-6" />
          <p className={`${poppins.className} text-black font-bold`}>
            Signin With Google
          </p>
        </Button>

        <TextDivider>Or</TextDivider>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-y-8">
            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <AtSign className="text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-none w-full bg-inputBg text-white "
                  {...register("username")}
                />
              </div>
              {errors.username?.message && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <Lock className=" text-gray-400 size-5" />
                <input
                  type={passwordClick ? "text" : "password"}
                  placeholder="Password"
                  className="outline-none w-full bg-inputBg text-white"
                  {...register("password")}
                />
                <div onClick={() => setPasswordClick((prev) => !prev)}>
                  {passwordClick ? (
                    <Eye className="cursor-pointer text-gray-400 size-5" />
                  ) : (
                    <EyeOff className="cursor-pointer text-gray-400 size-5" />
                  )}
                </div>
              </div>
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue`}
              aria-label="signup"
            >
              {submitting ? (
                <TbFidgetSpinner className="animate-spin text-2xl " />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
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
