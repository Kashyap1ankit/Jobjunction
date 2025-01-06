export const dynamic = "force-dynamic"; // static by default, unless reading the request
import prisma from "@/db";
import { calculateDayDiff } from "@/utils/helpers/calculate-day-difference";

export async function GET() {
  try {
    const allJobs = await prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    });

    for (const job of allJobs) {
      const diff = Math.floor(calculateDayDiff(job.createdAt));

      if (diff >= 7) {
        //deleting jobs if they are posted a weeek or more ago
        await prisma.post.delete({
          where: {
            id: job.id,
          },
        });
      }
    }
    return new Response(`Hello from auto`);
  } catch (error) {
    return new Response((error as Error).message);
  }
}
