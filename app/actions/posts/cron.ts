"use server";

import prisma from "@/db";
import { calculateDayDiff } from "@/utils/helpers/calculate-day-difference";
import cron from "node-cron";

async function deleteExpiredJobs() {
  try {
    const allJobs = await prisma.post.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    });

    for (let job of allJobs) {
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
  } catch (error) {
    console.log(error);
  }
}

export const cleanDB = async () => {
  cron.schedule(
    "0 0 * * *", //running my delete jobs function everynight at 12am IST
    async () => {
      await deleteExpiredJobs();
    },
  );
};
