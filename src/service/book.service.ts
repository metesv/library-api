import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBook = async (input: any) => {
  try {
    const insertResult = await prisma.book.create({
      data: input
    });
    return insertResult;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};