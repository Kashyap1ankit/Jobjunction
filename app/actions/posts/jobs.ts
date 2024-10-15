"use server";

import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { CheckUser } from "../users/checkUser";
import prisma from "@/db";

// Create new Jobs

export async function CreateJob(postdata: createJobSchemaType) {
  try {
    const { success } = createJobSchema.safeParse(postdata);
    if (!success) throw new Error("Error valiating data");

    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const newJob = await prisma.post.create({
      data: {
        apply_link: postdata.apply_link,
        company: postdata.company,
        experience_level: postdata.experience_level,
        job_type: postdata.job_type,
        location: postdata.location,
        position: postdata.position,
        role_description: postdata.role_description,
        role_name: postdata.role_name,
        salary_max: postdata.salary_max,
        salary_min: postdata.salary_min,
        author: {
          connect: {
            id: response.userId,
          },
        },
      },

      select: {
        id: true,
        authorId: true,
      },
    });

    if (!newJob) throw new Error("Error while creating new Job Listing");

    return {
      status: 200,
      message: "Successfully Created !",
      data: newJob,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}

//Get All jobs posting

export async function GetAllPost() {
  try {
    const allPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        apply_link: true,
        company: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        role_name: true,
        salary_max: true,
        salary_min: true,
        author: {
          select: {
            id: true,
            avatar: true,
            username: true,
            role: true,
          },
        },
        createdAt: true,
      },
    });

    if (!allPosts) throw new Error("No Posts Found");

    return {
      status: 200,
      message: "Succesfylly Fetched all Posts",
      data: allPosts,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}

//Get jobs by authorid

export async function GetPostByAuthorId(authorId: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const getPost = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },

      select: {
        id: true,
        apply_link: true,
        company: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        role_name: true,
        salary_max: true,
        salary_min: true,
        author: {
          select: {
            id: true,
            avatar: true,
            username: true,
            role: true,
          },
        },
      },
    });
    if (!getPost || getPost.length === 0)
      throw new Error("No Post related to user found");

    return {
      status: 200,
      message: "Fetched users all post",
      data: getPost,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: [],
    };
  }
}

//Delete Job

export async function DestroyPost(postId: string, authorId: string) {
  try {
    const response = await CheckUser();

    if (response.status !== 200) throw new Error(response.message);

    const isUserAuthor = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: authorId,
      },
    });

    const isAdmin = await prisma.user.findFirst({
      where: {
        id: authorId,
        role: "ADMIN",
      },
    });

    if (!isUserAuthor && !isAdmin)
      throw new Error("User is not the author of the post");

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!deletedPost) throw new Error("Error while deleting the user");

    return {
      status: 201,
      message: "Deleted Successfully",
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
    };
  }
}
