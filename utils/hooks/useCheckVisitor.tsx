"use client";

import { useIsProfileVisitorUser } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useCheckForVisitor(id: string) {
  const session = useSession();
  // const setIsVisitorUser = useSetRecoilState(isProfileVisitorUser);
  const { setIsVisitorUser } = useIsProfileVisitorUser();

  useEffect(() => {
    if (!session.data) return;

    const isVisitor = session.data.user?.id === id;
    setIsVisitorUser(isVisitor);
  }, [session.data, id, setIsVisitorUser]);
}
