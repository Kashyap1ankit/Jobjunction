import { Provider, UserRole } from "@prisma/client";

export type TextComponentType = {
  text: string;
  className?: string;
};
export type FieldsMarqueeType = {
  field: string;
  jobs: number;
  applied: string;
};

//Seeding database types

export type SeededUserType = {
  id: string;
  username: string;
  bio: string;
  password: string;
  avatar: string;
  email: string;
  instagram_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  provider: Provider;
  provider_id: string | null;
  role: UserRole;
};

export type SeededPostsType = {
  id: string;
  authorId: string;
  apply_link: string;
  company: string;
  experience_level: string;
  job_type: string;
  location: string;
  position: string;
  role_description: string;
  role_name: string;
  salary_max: number;
  salary_min: number;
};
export type GetAllPostResponseType = {
  status: number;
  data: JobLisitingType[] | [];
  message: string;
};

export type JobLisitingType = {
  id: string;
  apply_link: string;
  company: string;
  experience_level: string;
  job_type: string;
  location: string;
  position: string;
  role_description: string;
  role_name: string;
  salary_max: number;
  salary_min: number;
  author: {
    id: string;
    avatar: string | null;
    username: string;
    role: "ADMIN" | "USER";
  };
};

export type universalErrorType = {
  status: boolean;
  message: string;
};

export type GetUserDetailByIdType = {
  id: string;
  username: string;
  email: string;
  linkedin_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  role: UserRole;
};

export type GetUserBookmarksType = {
  id: string;
  post: {
    id: string;
    apply_link: string;
    company: string;
    position: string;
    role_name: string;
    author: {
      id: string;
      avatar: string | null;
      username: string;
    };
  };
};

export type GetAllUserType = {
  id: string;
  username: string;
  role: UserRole;
  avatar: string | null;
  email: string;
};

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
