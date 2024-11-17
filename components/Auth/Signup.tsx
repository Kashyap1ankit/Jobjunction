"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schema/auth";
import React, { useState } from "react";
import { SignupInputType } from "@/schema/auth";
import { useRouter } from "next/navigation";
import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { CreateUser } from "@/app/actions/users/signup";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";
import { TbFidgetSpinner } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import { fraunces, poppins } from "@/utils/fonts/font";
import TextDivider from "../ui/text-divider";
import { FcGoogle } from "react-icons/fc";

export default function SignupForm() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<SignupInputType>({
    resolver: zodResolver(signupSchema),
  });

  const [passwordClick, setPasswordClick] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function onSubmit(data: any) {
    setSubmitting(true);
    try {
      const response = await CreateUser(data);
      if (response.status !== 200) throw new Error(response.message);
      toast("Account created Successfully.", {
        duration: 2000,
      });
      router.push("/signin");

      setCurrentIndex(0);
    } catch (error) {
      toast((error as Error).message, {
        duration: 2000,
      });
    } finally {
      setSubmitting(false);
      reset();
    }
  }

  const filedValues = [
    ["username", "email", "password"],
    ["bio", "instagram_url", "linkedin_url", "twitter_url"],
  ];

  async function next() {
    const fields = filedValues[currentIndex];

    const isValid = await trigger(fields as any);

    if (!isValid) return;

    if (currentIndex > -1 && currentIndex < 2) {
      if (currentIndex === 1) {
        return await handleSubmit(onSubmit)();
      }
      setCurrentIndex((prev) => prev + 1);
    }
  }

  async function handleNext() {
    if (currentIndex >= 1) return;
    setCurrentIndex((prev) => prev + 1);
  }

  async function handlePrevious() {
    if (currentIndex <= 0) return;
    setCurrentIndex((prev) => prev - 1);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto mb-4 mt-6 w-11/12 rounded-lg border-2 border-slate-800 bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg p-4 text-white sm:w-3/4 md:mt-24 md:mt-8 md:w-1/2 md:p-6 lg:mt-20 xl:w-1/3">
        <Link href={"/"} aria-label="go-back">
          <IoArrowBack className="mb-4 size-6 cursor-pointer text-gray-400 hover:text-white" />
        </Link>

        <div className="flex gap-2">
          {currentIndex > 0 ? (
            <ChevronLeft className="cursor-pointer" onClick={handlePrevious} />
          ) : (
            ""
          )}
          <p className="mb-6 text-gray-400">Step {currentIndex + 1} / 2</p>
          {currentIndex >= 0 ? (
            <ChevronRight className="cursor-pointer" onClick={handleNext} />
          ) : (
            ""
          )}
        </div>

        <>
          <p
            className={`${poppins.className} mb-2 text-center text-2xl font-bold text-white sm:text-3xl`}
          >
            Create New Account
          </p>
          <p
            className={`${poppins.className} sm:text-md text-center text-sm font-bold text-gray-500`}
          >
            Start your journey with jobjunction
          </p>
        </>

        <Button
          className="mt-8 flex w-full gap-4 bg-white hover:bg-white"
          onClick={() => signIn("google", { callbackUrl: "/jobs" })}
          aria-label="signup-google"
        >
          <FcGoogle className="size-6" />
          <p className={`${poppins.className} font-bold text-black`}>
            Signup With Google
          </p>
        </Button>

        <TextDivider className="my-4">Or</TextDivider>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentIndex === 0 ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8">
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
                  <Mail className="size-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-inputBg text-white outline-none"
                    {...register("email")}
                  />
                </div>
                {errors.email?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email?.message}
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
            </div>
          ) : null}

          {currentIndex === 1 ? (
            <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Write Bio..."
                  className="w-full rounded-md bg-inputBg p-4 text-white outline-none"
                  {...register("bio")}
                />
                {errors.bio?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.bio?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex w-full items-center gap-2 rounded-md bg-inputBg p-4">
                  <FaInstagram className="size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Instagram url"
                    className="w-full bg-inputBg text-white outline-none"
                    {...register("instagram_url")}
                  />
                </div>

                {errors.instagram_url?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.instagram_url?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex w-full items-center gap-2 rounded-md bg-inputBg p-4">
                  <FaTwitter className="size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Twitter url"
                    className="w-full bg-inputBg text-white outline-none"
                    {...register("twitter_url")}
                  />
                </div>

                {errors.twitter_url?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.twitter_url?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex w-full items-center gap-2 rounded-md bg-inputBg p-4">
                  <FaLinkedin className="size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Linkedin url"
                    className="w-full bg-inputBg text-white outline-none"
                    {...register("linkedin_url")}
                  />
                </div>

                {errors.linkedin_url?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.linkedin_url?.message}
                  </p>
                )}
              </div>
            </div>
          ) : null}

          <Button
            onClick={next}
            className={`${fraunces.className} mt-6 w-full bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:from-secondarySkyBlue hover:to-primarySkyBlue`}
            disabled={submitting}
            aria-label="signup-submit"
          >
            {currentIndex === 1 ? (
              <div>
                {submitting ? (
                  <TbFidgetSpinner className="animate-spin text-2xl" />
                ) : (
                  <p>Submit</p>
                )}
              </div>
            ) : (
              "Next Step"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Existing User ?
          <Link href="/signin" aria-label="signin">
            <span className="cursor-pointer text-secondarySkyBlue">
              Login to Account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
