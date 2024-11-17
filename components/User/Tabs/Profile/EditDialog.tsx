"use client";

import { UpdateUserInfo } from "@/app/actions/users/updateUserInfo";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { userProfileUpdateSchema, userProfileUpdateType } from "@/schema/auth";
import { refetchAtom, universalError } from "@/store/store";
import { fraunces } from "@/utils/fonts/font";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

export default function EditUserProfileDialog({
  id,
  bio,
  linkedin_url,
  twitter_url,
  instagram_url,
}: {
  id: string;
  bio: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const setError = useSetRecoilState(universalError);
  const setRefetch = useSetRecoilState(refetchAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userProfileUpdateType>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  async function updatedUser(data: userProfileUpdateType) {
    setLoader(true);
    try {
      const res = await UpdateUserInfo(
        id,
        data.bio,
        data.instagram_url,
        data.twitter_url,
        data.linkedin_url,
      );

      if (res.status !== 200) throw new Error(res.message);

      setRefetch((prev) => !prev);
    } catch (error) {
      setError({
        status: true,
        message: (error as Error).message,
      });
    } finally {
      setModalOpen(false);
      setLoader(false);
    }
  }

  return (
    <div>
      <AlertDialog open={modalOpen}>
        <AlertDialogTrigger>
          <div
            className="flex gap-2 items-center px-4 py-2 rounded-full cursor-pointer bg-secondaryBorder"
            onClick={() => setModalOpen(true)}
          >
            <PenIcon className="size-4 text-white" />
            <p className="text-sm md:text-lg text-white">Edit</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-md max-w-[300px] sm:max-w-[400px] md:max-w-[450px] bg-primaryBg">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle className="mx-auto text-white text-2xl">
                Edit Information !
              </AlertDialogTitle>
              <X
                className="size-4 cursor-pointer text-gray-400"
                onClick={() => setModalOpen(false)}
              />
            </div>
            <AlertDialogDescription>
              <form
                onSubmit={handleSubmit(updatedUser)}
                className="flex flex-col gap-6 mt-4"
              >
                <div>
                  <label htmlFor="bio" className="text-md font-bold text-white">
                    Bio
                  </label>
                  <input
                    type="text"
                    {...register("bio")}
                    className=" mt-2 p-2 rounded-md text-white p-4 rounded-md  w-full bg-inputBg outline-none"
                    placeholder="Write.."
                    id="bio"
                    defaultValue={bio || undefined}
                  />
                  {errors.bio?.message && (
                    <p className="text-red-500">{errors.bio?.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="instagram_url"
                    className="text-md font-bold text-white"
                  >
                    Instagram
                  </label>
                  <input
                    type="text"
                    {...register("instagram_url")}
                    className=" mt-2 p-2 rounded-md text-white p-4 rounded-md  w-full bg-inputBg outline-none"
                    placeholder=""
                    id="instagram_url"
                    defaultValue={instagram_url || undefined}
                  />
                  {errors.instagram_url?.message && (
                    <p className="text-red-500">
                      {errors.instagram_url?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="twitter_url"
                    className="text-md font-bold text-white"
                  >
                    Twitter
                  </label>
                  <input
                    type="text"
                    {...register("twitter_url")}
                    className=" mt-2 p-2 rounded-md text-white p-4 rounded-md  w-full bg-inputBg outline-none"
                    placeholder=""
                    id="twitter_url"
                    defaultValue={twitter_url || undefined}
                  />
                  {errors.twitter_url?.message && (
                    <p className="text-red-500">
                      {errors.twitter_url?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="linkedin_url"
                    className="text-md font-bold text-white"
                  >
                    Linkedin
                  </label>
                  <input
                    type="text"
                    {...register("linkedin_url")}
                    className=" mt-2 p-2 rounded-md text-white p-4 rounded-md  w-full bg-inputBg outline-none"
                    placeholder=""
                    id="linkedin_url"
                    defaultValue={linkedin_url || undefined}
                  />
                  {errors.linkedin_url?.message && (
                    <p className="text-red-500">
                      {errors.linkedin_url?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-row-reverse">
                  <Button
                    className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue w-full mt-6`}
                    disabled={loader}
                    aria-label="edit-profile-save"
                  >
                    {loader ? <FaSpinner className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
