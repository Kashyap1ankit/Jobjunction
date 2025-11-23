"use client";

import { ApprovedJobLisitingType } from "@/types/types";

import { create } from "zustand";

interface universalLoaderType {
  loading: boolean;
  setLoading: (val: boolean) => void;
}

interface errorObject {
  status: boolean;
  message: string;
}
interface universalErrorType {
  default: errorObject;
  setError: (val: errorObject) => void;
}

interface universalActivePostModalType {
  activeJobModalId: string;
  setActiveJobModalId: (val: string) => void;
}

//Universal

export const useUniversalLoader = create<universalLoaderType>((set) => ({
  loading: false,
  setLoading: (val: boolean) =>
    set({
      loading: val,
    }),
}));

export const useUniversalError = create<universalErrorType>((set) => ({
  default: { status: false, message: "" },
  setError: (val: errorObject) =>
    set({
      default: val,
    }),
}));

export const useUniversalActivePostModal = create<universalActivePostModalType>(
  (set) => ({
    activeJobModalId: "123",
    setActiveJobModalId: (val: string) => set({ activeJobModalId: val }),
  }),
);

//Joblisting atoms

interface allJobListingsType {
  allJobs: [] | ApprovedJobLisitingType[];
  setAllJobs: (val: ApprovedJobLisitingType[]) => void;
}

export const useAllJobListings = create<allJobListingsType>((set) => ({
  allJobs: [],
  setAllJobs: (val: ApprovedJobLisitingType[]) =>
    set({
      allJobs: val,
    }),
}));

interface joblistingErrorType {
  errorNoPost: boolean;
  setError: (val: boolean) => void;
}

export const useJobListingError = create<joblistingErrorType>((set) => ({
  errorNoPost: false,
  setError: (val: boolean) =>
    set({
      errorNoPost: val,
    }),
}));

//User profile

interface isProfileVisitorUserType {
  isVisitorUser: boolean;
  setIsVisitorUser: (val: boolean) => void;
}

export const useIsProfileVisitorUser = create<isProfileVisitorUserType>(
  (set) => ({
    isVisitorUser: false,
    setIsVisitorUser: (val: boolean) => set({ isVisitorUser: val }),
  }),
);

interface BookmarkState {
  bookmarkedPosts: Record<string, boolean>; // like atomFamily
  setBookmarked: (postId: string, value: boolean) => void;
}

export const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarkedPosts: {},

  setBookmarked: (postId, value) =>
    set((state) => ({
      bookmarkedPosts: {
        ...state.bookmarkedPosts,
        [postId]: value,
      },
    })),
}));

// export const bookmarkedPosts = atomFamily<boolean, string>({
//   key: "bookmarkedPosts",
//   default: false,
// });

interface RefetchType {
  refetch: boolean;
  setRefetch: (val: boolean) => void;
}

export const useRefetchAtom = create<RefetchType>((set) => ({
  refetch: false,
  setRefetch: (val: boolean) =>
    set({
      refetch: val,
    }),
}));

// export const universalLoader = atom<boolean>({
//   key: "universalLoader",
//   default: false,
// });

// export const universalError = atom<universalErrorType>({
//   key: "universalError",
//   default: { status: false, message: "" },
// });

// export const universalActivePostModal = atom<string>({
//   key: "universalActiveModal",
//   default: "123",
// });

// export const allJobListings = atom<ApprovedJobLisitingType[]>({
//   key: "allJobListing",
//   default: [],
// });

// export const joblistingError = atom<boolean>({
//   key: "joblistingError",
//   default: false,
// });

// export const isProfileVisitorUser = atom<boolean>({
//   key: "isProfileVisitorUser",
//   default: false,
// });

// export const refetchAtom = atom({ key: "refetch", default: false });
