import { PrismaClient } from "@prisma/client";

const generatePrismaClient = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof generatePrismaClient>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? generatePrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
