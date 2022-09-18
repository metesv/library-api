import { PrismaClient } from '@prisma/client';
import { UserInput } from "../models/user.model";

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};

export const getUser = async (input: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(input.userId)
      },
      include: {
        books: true
      }
    });
    return user;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};

export const createUser = async (input: UserInput) => {
  try {
    const insertResult = await prisma.user.create({
      data: input
    });
    return insertResult;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};