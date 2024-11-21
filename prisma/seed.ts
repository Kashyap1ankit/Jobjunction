import prisma from "../db/index";
import bcrypt from "bcryptjs";
import { SeededPostsType, SeededUserType } from "@/types/types";
import { Provider, UserRole } from "@prisma/client";

const users = [
  {
    id: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    username: "admin_user",
    bio: "Admin of the platform",
    password: "Hello@1",
    avatar:
      "https://t4.ftcdn.net/jpg/00/88/53/89/360_F_88538986_5Bi4eJ667pocsO3BIlbN4fHKz8yUFSuA.jpg",
    email: "admin@example.com",
    instagram_url: "",
    linkedin_url: "",
    twitter_url: "",
    provider: Provider.credentials,
    provider_id: null,
    role: UserRole.ADMIN,
  },
  {
    id: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
    username: "user",
    bio: "User of the platform",
    password: "Hello@1",
    avatar:
      "https://www.shutterstock.com/image-photo/portrait-smiling-man-curly-black-260nw-2141624517.jpg",
    email: "user@example.com",
    instagram_url: "https://instagram.com/user",
    linkedin_url: "https://linkedin.com/in/user",
    twitter_url: "https://twitter.com/user",
    provider: Provider.credentials,
    provider_id: null,
    role: UserRole.USER,
  },
];

const posts = [
  {
    id: "c81bc81b-dead-4e5d-abff-90865d1e13b3",
    authorId: "b81bc81b-dead-4e5d-abff-90865d1e13b2",
    apply_link: "https://google.com",
    company: "Microsoft Inc",
    company_logo: "https://tinyurl.com/bpx32mxh",
    company_website: "https:microsoft.com",
    experience_level: "1y",
    job_type: "Internship",
    location: "Onsite",
    position: "Frontend",
    role_description: "Hello world of the world is one of",
    salary_disclosed: true,
    salary_max: 5000,
    salary_min: 150000,
  },
  {
    id: "d81bc81b-dead-4e5d-abff-90865d1e13b4",
    authorId: "a81bc81b-dead-4e5d-abff-90865d1e13b1",
    apply_link: "https://google.com",
    company: "Amazon Inc",
    company_logo: null,
    company_website: null,
    experience_level: "Fresher",
    job_type: "Fulltime",
    location: "Remote",
    position: "Go",
    role_description: "Hello world of the world is one of ",
    salary_disclosed: false,
    salary_max: null,
    salary_min: null,
  },
];

async function insertUser() {
  await Promise.all(
    users.map(async (e: SeededUserType) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(e.password, saltRounds);
      try {
        await prisma.user.upsert({
          where: {
            id: e.id,
          },

          update: {
            id: e.id,
          },
          create: {
            id: e.id,
            username: e.username,
            bio: e.bio,
            password: hashedPassword,
            avatar: e.avatar,
            email: e.email,
            instagram_url: e.instagram_url,
            linkedin_url: e.linkedin_url,
            twitter_url: e.twitter_url,
            provider: e.provider,
            provider_id: e.provider_id,
            role: e.role,
          },
        });
      } catch (error) {
        console.log("Error while inserting user", (error as Error).message);
      }
    }),
  );
}

async function insertPosts() {
  await Promise.all(
    posts.map(async (e: SeededPostsType) => {
      try {
        await prisma.post.upsert({
          where: {
            id: e.id,
          },
          update: {
            id: e.id,
          },
          create: {
            id: e.id,
            authorId: e.authorId,
            apply_link: e.apply_link,
            company: e.company,
            company_logo: "/Images/jj-logo.png",
            experience_level: e.experience_level,
            job_type: e.job_type,
            location: e.location,
            position: e.position,
            role_description: e.role_description,
            salary_disclosed: e.salary_disclosed,
            salary_max: e.salary_max,
            salary_min: e.salary_min,
          },
        });
      } catch (error) {
        console.log("Error while inserting posts", (error as Error).message);
      }
    }),
  );
}

async function main() {
  try {
    await prisma.$connect();
    await insertUser();
    await insertPosts();
  } catch (error) {
    console.log("Error", (error as Error).message);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Successfully seeded");
  })
  .catch((err) => console.log(err));
