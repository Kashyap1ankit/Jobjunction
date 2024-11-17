"use client";

import { Button } from "@/components/ui/button";
import { isProfileVisitorUser } from "@/store/store";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import { DeleteUser } from "@/app/actions/users/updateUserInfo";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { poppins } from "@/utils/fonts/font";
import Randomstring from "randomstring";

import { deleteUserSchema, deleteUserType } from "@/schema/auth";
export default function DeleteComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<deleteUserType>({
    resolver: zodResolver(deleteUserSchema),
  });

  const session = useSession();
  const { userId }: { userId: string } = useParams();
  const isVisitorUser = useRecoilValue(isProfileVisitorUser);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputError, setInputError] = useState(false);
  const [randomString, setRandomString] = useState<string>(
    Randomstring.generate(8),
  );

  useEffect(() => {
    if (!isVisitorUser) redirect(`/user/${userId}/profile`);
  }, []);

  async function handleDeleteAccount(data: deleteUserType) {
    setLoading(true);
    try {
      if (!session.data?.user?.id) throw new Error("No user loggedin");

      if (data.random !== randomString) {
        setInputError(true);
        setRandomString(Randomstring.generate(8));
        return;
      }

      const response = await DeleteUser(session.data?.user.id);
      if (response.status !== 201) throw new Error(response.message);
      setModalOpen(false);
      signOut();
    } catch {
      toast("Error Occured");
    } finally {
      setLoading(false);
    }
  }

  if (!session.data?.user || session.data.user === undefined) {
    return <div>Error Found</div>;
  }

  return (
    <div className="mt-12 min-h-screen">
      <p className="font-kanit text-xl text-red-500">Delete Account</p>

      <div className="mt-8">
        <p className="text-gray-400">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <AlertDialog open={modalOpen}>
          <AlertDialogTrigger className="mt-8 w-full">
            <div
              className="w-full cursor-pointer rounded-md bg-red-500 px-4 py-2 text-black text-white sm:w-fit"
              onClick={() => setModalOpen(true)}
            >
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[300px] rounded-md bg-primaryBg md:max-w-[450px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </p>

                <form
                  className="mt-6"
                  onSubmit={handleSubmit(handleDeleteAccount)}
                >
                  <label
                    className={`${poppins.className} text-white`}
                    htmlFor="random"
                  >
                    Type <span className="text-red-500">{randomString}</span>
                  </label>
                  <input
                    {...register("random")}
                    id="random"
                    className="mt-2 w-full rounded-md bg-inputBg p-2 p-4 text-white outline-none"
                    onPaste={(e) => e.preventDefault()}
                  />
                  {errors.random?.message && (
                    <p className="mt-2 text-red-500">
                      {errors.random?.message}
                    </p>
                  )}
                  {inputError && (
                    <p className="mt-2 text-red-500">Mismatched , Try again</p>
                  )}

                  <div className="flex items-baseline gap-2">
                    <Button
                      disabled={loading}
                      className="mt-4 bg-red-500 text-white hover:bg-red-500"
                      aria-label="delete-yes"
                    >
                      {loading ? <FaSpinner className="animate-spin" /> : "Yes"}
                    </Button>

                    <div
                      className="cursor-pointer rounded-md border-2 border-slate-500 bg-transparent px-4 py-2 text-white hover:bg-transparent"
                      onClick={() => setModalOpen(false)}
                    >
                      <p>No</p>
                    </div>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
