// "use server";

// import prisma from "@/db";
// import { calculateDayDiff } from "@/utils/helpers/calculate-day-difference";
// import cron from "node-cron";

// async function deleteExpiredJobs() {
//   try {
//     const allJobs = await prisma.post.findMany({
//       select: {
//         id: true,
//         createdAt: true,
//       },
//     });

//     for (const job of allJobs) {
//       const diff = Math.floor(calculateDayDiff(job.createdAt));

//       if (diff >= 7) {
//         //deleting jobs if they are posted a weeek or more ago
//         await prisma.post.delete({
//           where: {
//             id: job.id,
//           },
//         });
//       }
//     }
//   } catch (error) {
//     return {
//       status: 400,
//       message: (error as Error).message,
//     };
//   }
// }

// export const cleanDB = async () => {
//   cron.schedule(
//     "* * * * *", // Equivalent to 12:00 AM IST
//     async () => {
//       await deleteExpiredJobs();
//     },
//     {
//       timezone: "Asia/Kolkata",
//     },
//   );
// };
