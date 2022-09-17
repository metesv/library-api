import { PrismaClient } from '@prisma/client';
import { UserInput } from "../models/user.model";

const prisma = new PrismaClient();

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