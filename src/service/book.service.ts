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

export const borrowBook = async (input: any) => {
  try {
    const updateBook = await prisma.book.update({
      where: {
        id: parseInt(input.bookId)
      },
      data: {
        readerId: parseInt(input.userId),
        rentedDay: new Date()
      }
    });
    return updateBook;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};