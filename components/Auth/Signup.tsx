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
  X,
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
  const [items, setItems] = useState<string[] | undefined>([]);
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
      <div className="w-11/12 sm:w-3/4 md:w-1/2 xl:w-1/3 mx-auto rounded-lg p-4 md:p-6  bg-gradient-to-b from-secondaryTestimoanlBg to-primaryTestimonalBg mt-6 md:mt-8 lg:mt-20 md:mt-24 border-2 border-slate-800 mt-6 md:mt-8 mb-4 lg:mt-20 md:mt-24 text-white">
        <Link href={"/"} aria-label="go-back">
          <IoArrowBack className="text-gray-400 size-6 cursor-pointer mb-4 hover:text-white" />
        </Link>

        <div className="flex gap-2 ">
          {currentIndex > 0 ? (
            <ChevronLeft className="cursor-pointer" onClick={handlePrevious} />
          ) : (
            ""
          )}
          <p className="text-gray-400 mb-6">Step {currentIndex + 1} / 2</p>
          {currentIndex >= 0 ? (
            <ChevronRight className="cursor-pointer" onClick={handleNext} />
          ) : (
            ""
          )}
        </div>

        <>
          <p
            className={`${poppins.className} text-2xl sm:text-3xl  mb-2 text-center text-white font-bold `}
          >
            Create New Account
          </p>
          <p
            className={`${poppins.className} text-sm sm:text-md text-center text-gray-500 font-bold`}
          >
            Start your journey with jobjunction
          </p>
        </>

        <Button
          className="bg-white w-full flex gap-4 hover:bg-white mt-8"
          onClick={() => signIn("google", { callbackUrl: "/jobs" })}
          aria-label="signup-google"
        >
          <FcGoogle className="size-6" />
          <p className={`${poppins.className} text-black font-bold`}>
            Signup With Google
          </p>
        </Button>

        <TextDivider className="my-4">Or</TextDivider>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentIndex === 0 ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8  ">
              <div>
                <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                  <AtSign className="text-gray-400 size-5" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="outline-none w-full bg-inputBg text-white"
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
                  <Mail className=" text-gray-400 size-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="outline-none w-full bg-inputBg text-white"
                    {...register("email")}
                  />
                </div>
                {errors.email?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email?.message}
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
            </div>
          ) : null}

          {currentIndex === 1 ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 mt-8">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Write Bio..."
                  className="outline-none w-full bg-inputBg text-white p-4  rounded-md "
                  {...register("bio")}
                />
                {errors.bio?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.bio?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                  <FaInstagram className="text-gray-400 size-5" />
                  <input
                    type="text"
                    placeholder="Instagram url"
                    className="outline-none w-full bg-inputBg text-white"
                    {...register("instagram_url")}
                  />
                </div>

                {errors.instagram_url?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.instagram_url?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                  <FaTwitter className="text-gray-400 size-5" />
                  <input
                    type="text"
                    placeholder="Twitter url"
                    className="outline-none w-full bg-inputBg text-white"
                    {...register("twitter_url")}
                  />
                </div>

                {errors.twitter_url?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.twitter_url?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                  <FaLinkedin className="text-gray-400 size-5" />
                  <input
                    type="text"
                    placeholder="Linkedin url"
                    className="outline-none w-full bg-inputBg text-white"
                    {...register("linkedin_url")}
                  />
                </div>

                {errors.linkedin_url?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.linkedin_url?.message}
                  </p>
                )}
              </div>
            </div>
          ) : null}

          <Button
            onClick={next}
            className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue w-full mt-6`}
            disabled={submitting}
            aria-label="signup-submit"
          >
            {currentIndex === 1 ? (
              <div>
                {submitting ? (
                  <TbFidgetSpinner className="animate-spin text-2xl " />
                ) : (
                  <p>Submit</p>
                )}
              </div>
            ) : (
              "Next Step"
            )}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
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
