"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DeleteUser } from "@/app/actions/users/updateUserInfo";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DeleteUserAdminModal({ userId }: { userId: string }) {
  const session = useSession();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setError] = useState({
    status: false,
    message: "",
  });

  async function handleDeleteAccountByAdmin() {
    setLoading(true);
    try {
      if (!session.data?.user?.id) throw new Error("No user loggedin");
      const response = await DeleteUser(userId);
      if (response.status !== 201) throw new Error(response.message);
      setModalOpen(false);
    } catch (error) {
      setError({
        status: true,
        message: (error as Error).message,
      }),
        setTimeout(() => {
          setError({
            status: false,
            message: "",
          });
        }, 1500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={modalOpen}>
      <AlertDialogTrigger>
        <Trash2
          className="cursor-pointer text-red-500"
          onClick={() => setModalOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[300px] rounded-md md:max-w-[450px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <Button
            onClick={() => {
              handleDeleteAccountByAdmin();
            }}
            disabled={loading}
            aria-label="delete-account-yes"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Yes"}
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            className="border-2 border-slate-500 bg-transparent text-black hover:bg-transparent"
            aria-label="delete-account-no"
          >
            No
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
