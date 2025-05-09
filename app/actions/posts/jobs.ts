"use server";

import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { CheckUser } from "../users/checkUser";
import prisma from "@/db";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { File } from "buffer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        company_logo: postdata.company_logo,
        company_website: postdata.company_website,
        experience_level: postdata.experience_level,
        job_type: postdata.job_type,
        location: postdata.location,
        position: postdata.position,
        role_description: postdata.role_description,
        salary_disclosed: postdata.salary_disclosed,
        salary_max: postdata.salary_max,
        salary_min: postdata.salary_min,
        approved: response.role === "ADMIN" ? true : false,
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

      where: {
        approved: false,
      },

      select: {
        id: true,
        apply_link: true,
        company: true,
        company_logo: true,
        company_website: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        salary_disclosed: true,
        salary_max: true,
        salary_min: true,
        approved: true,
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

//Get All approved jobs posting

export async function GetAllApprovedPost() {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        approved: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        apply_link: true,
        company: true,
        company_logo: true,
        company_website: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        salary_disclosed: true,
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

export async function GetJobById(id: string) {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        id,
        approved: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        apply_link: true,
        company: true,
        company_logo: true,
        company_website: true,
        experience_level: true,
        job_type: true,
        location: true,
        position: true,
        role_description: true,
        salary_disclosed: true,
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
        authorId,
      },

      select: {
        id: true,
        company: true,
        company_website: true,
        position: true,
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
        authorId,
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

//Upload Image

export async function UploadImage(data: FormData) {
  try {
    const file = data.get("image");

    if (!file || !(file instanceof File)) {
      return {
        status: 401,
        message: "File is not provided",
      };
    }
    //Converting the file instance to buffer
    const bufferArr = await file.arrayBuffer();
    const buffer = Buffer.from(bufferArr);

    const uploadToCloud = new Promise<any>((resolve, reject) => {
      const cld = cloudinary.uploader.upload_stream(
        {
          use_filename: true,
          folder: "jobjunction",
          overwrite: false,
          resource_type: "image",
        },
        (err: any, res: any) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        },
      );

      streamifier.createReadStream(buffer).pipe(cld);
    });

    const uploadedImageObject = await uploadToCloud;

    return {
      status: 200,
      message: "File uploaded successfully",
      public_id: uploadedImageObject.public_id,
      secure_url: uploadedImageObject.secure_url,
    };
  } catch (error) {
    return {
      status: 200,
      message: (error as Error).message,
      public_id: null,
      secure_url: null,
    };
  }
}

//Approve job

export async function ApproveJob(id: string) {
  try {
    await prisma.post.update({
      where: {
        id,
      },

      data: {
        approved: true,
      },
    });

    return {
      status: 200,
      message: "Job has been approved",
    };
  } catch (error) {
    return {
      status: 400,
      message: (error as Error).message,
    };
  }
}
