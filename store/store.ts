"use client";

import { JobLisitingType, universalErrorType } from "@/types/types";
import { atom, atomFamily } from "recoil";

//Universal

export const universalLoader = atom<boolean>({
  key: "universalLoader",
  default: false,
});

export const universalError = atom<universalErrorType>({
  key: "universalError",
  default: {
    status: false,
    message: "",
  },
});

//Joblisting atoms

export const allJobListings = atom<JobLisitingType[]>({
  key: "allJobListing",
  default: [],
});

export const joblistingError = atom<boolean>({
  key: "joblistingError",
  default: false,
});

//User profile

export const isProfileVisitorUser = atom<boolean>({
  key: "isProfileVisitorUser",
  default: false,
});

export const refetchAtom = atom({
  key: "refetch",
  default: false,
});

export const bookmarkedPosts = atomFamily<boolean, string>({
  key: "bookmarkedPosts",
  default: false,
});

export const filterMobSheet = atom({
  key: "filterMobSheet",
  default: false,
});
