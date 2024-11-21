"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === `/user/${params.userId}`)
      redirect(`/user/${params.userId}/profile`);
  });
  return <div className="text-white"> You entered wrong page</div>;
}
