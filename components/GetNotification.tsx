"use client";
import {
  addNotificationSubscription,
  getUserSubscription,
  removeNotificationSubscription,
} from "@/app/actions/notification";

import { useEffect, useState } from "react";
import { IoNotifications, IoNotificationsOff } from "react-icons/io5";
import { toast } from "sonner";

function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export default function GetNotification() {
  const [notificationPermission, setNotificationPermission] = useState<
    "denied" | "granted" | "default"
  >(window.Notification.permission);

  const [refetch, setRefetch] = useState<boolean>(false);

  const [userSub, setUserSub] = useState<{
    id: string;
    userId: string;
    subscription: string;
  } | null>(null);

  async function showNotificationClick() {
    if ("serviceWorker" in navigator && "Notification" in window) {
      try {
        await window.Notification.requestPermission();
        if (window.Notification.permission === "granted") {
          setNotificationPermission("granted");
          await verifyRegistration();
        } else {
          setNotificationPermission(window.Notification.permission);
          toast.info(
            "Permission Not granted . Go to settings & allow notifications",
          );
        }
      } catch (error) {
        console.log("1");
        toast((error as Error).message);
      } finally {
        setRefetch((prev) => !prev);
      }
    }
  }

  async function verifyRegistration() {
    try {
      if ("serviceWorker" in navigator) {
        let registration = await navigator.serviceWorker.getRegistration();

        if (!registration) {
          registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
          });
        }

        await subscribeUser(registration);
      }
    } catch (error) {
      console.log("1-2");
      toast((error as Error).message);
    }
  }

  async function subscribeUser(registration: ServiceWorkerRegistration) {
    try {
      if (!("Notification" in window)) {
        throw new Error("This browser does not support notifications");
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Notification permission denied");
      }

      if (!("PushManager" in window)) {
        throw new Error("Push messaging is not supported");
      }

      const appServeKey = urlB64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      );

      const option = {
        userVisibleOnly: true,
        applicationServerKey: appServeKey,
      };

      const subcriptionObject =
        await registration.pushManager.subscribe(option);
      const response = await addNotificationSubscription(
        JSON.stringify(subcriptionObject),
      );

      if (response.status !== 200) throw new Error(response.message);

      toast.success("Notification is enabled", {
        style: {
          backgroundColor: "#65a30d",
          color: "white",
          borderColor: "#65a30d",
        },
      });
    } catch (error) {
      console.log("1-3");
      toast.error((error as Error).message, {
        style: {
          backgroundColor: "red",
          color: "white",
          borderColor: "#334155",
        },
      });
    }
  }

  async function deleteNotificationPermission() {
    if ("serviceWorker" in navigator && "Notification" in window) {
      try {
        await removeNotificationSubscription();
        setNotificationPermission("denied");
        toast.warning(
          "Notifications have been disabled. To stop browser notifications completely, please update your notification settings in the browser",
          {
            style: {
              backgroundColor: "#334155",
              color: "white",
              borderColor: "#334155",
            },
          },
        );
      } catch (error) {
        toast((error as Error).message);
      }
    }
  }

  useEffect(() => {
    setNotificationPermission(window.Notification.permission);
  }, []);

  useEffect(() => {
    const getUserSubs = async () => {
      const response = await getUserSubscription();

      if (response.status !== 200) {
        setUserSub(null);
        return;
      }
      setUserSub(response.data);
    };
    getUserSubs();
  }, [refetch]);

  return (
    <div>
      {notificationPermission === "granted" && userSub?.id ? (
        <IoNotifications
          className="size-6 cursor-pointer text-white"
          onClick={deleteNotificationPermission}
        />
      ) : (
        <IoNotificationsOff
          className="size-6 cursor-pointer text-white"
          onClick={showNotificationClick}
        />
      )}
    </div>
  );
}
