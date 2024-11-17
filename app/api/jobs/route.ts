import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { experience, job, location } = await req.json();

    const response = await prisma.post.findMany({
      where: {
        AND: [
          experience.length > 0 ? { experience_level: { in: experience } } : {},
          job.length > 0 ? { job_type: { in: job } } : {},
          location.length > 0 ? { location: { in: location } } : {},
        ],
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
          },
        },
      },
    });

    if (response.length === 0) throw new Error("No Posts Found");

    return NextResponse.json({
      status: 200,
      message: "Succesfully fetched Posts",
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      message: (error as Error).message,
      data: [],
    });
  }
}
