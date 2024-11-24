"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function RegisterSw() {
  useEffect(() => {
    const registerServicWorker = async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
              updateViaCache: "none",
            },
          );

          if (!registration.active) {
            registration.addEventListener("activate", () => {
              return true;
            });
          }
        }
      } catch {
        toast("Service Worked cannot be registered");
      }
    };

    registerServicWorker();
  }, []);
  return <></>;
}
