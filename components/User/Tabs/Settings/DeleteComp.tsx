"use client";

import { Button } from "@/components/ui/button";
import { isProfileVisitorUser } from "@/store/store";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
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
    Randomstring.generate(8)
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
    } catch (error) {
      toast("Error Occured");
    } finally {
      setLoading(false);
    }
  }

  if (!session.data?.user || session.data.user === undefined) {
    return <div>Error Found</div>;
  }

  return (
    <div className="min-h-screen mt-12">
      <p className="text-xl text-red-500 font-kanit">Delete Account</p>

      <div className="mt-8">
        <p className="text-gray-400">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <AlertDialog open={modalOpen}>
          <AlertDialogTrigger className="mt-8 w-full ">
            <div
              className="bg-red-500 text-black   py-2 px-4 cursor-pointer rounded-md text-white w-full sm:w-fit"
              onClick={() => setModalOpen(true)}
            >
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[300px] rounded-md md:max-w-[450px] bg-primaryBg">
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
                    className={`${poppins.className} text-white `}
                    htmlFor="random"
                  >
                    Type <span className="text-red-500">{randomString}</span>
                  </label>
                  <input
                    {...register("random")}
                    id="random"
                    className=" mt-2 p-2 rounded-md text-white p-4 rounded-md  w-full bg-inputBg outline-none"
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

                  <div className="flex gap-2 items-baseline">
                    <Button
                      disabled={loading}
                      className="mt-4 bg-red-500 hover:bg-red-500 text-white"
                      aria-label="delete-yes"
                    >
                      {loading ? <FaSpinner className="animate-spin" /> : "Yes"}
                    </Button>

                    <div
                      className="bg-transparent text-white hover:bg-transparent border-2 border-slate-500 py-2 px-4 cursor-pointer rounded-md"
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
