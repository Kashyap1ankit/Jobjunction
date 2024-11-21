"use client";

import { isProfileVisitorUser } from "@/store/store";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

export function useCheckForVisitor(id: string) {
  const session = useSession();
  const setIsVisitorUser = useSetRecoilState(isProfileVisitorUser);

  if (session.data) {
    if (session.data.user?.id === id) {
      setIsVisitorUser(true);
    } else {
      setIsVisitorUser(false);
    }
  }
}
