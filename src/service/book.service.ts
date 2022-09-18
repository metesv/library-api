import { PrismaClient } from '@prisma/client';
import { Book } from '../models/book.model';

const prisma = new PrismaClient();

export const getBooks = async () => {
  try {
    const book = await prisma.book.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return book;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};

export const getBook = async (input: any) => {
  const { bookId } = input;
  try {
    const book: Book | null = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId)
      },
      select: {
        id: true,
        name: true,
        scores: true
      }
    });

    if (book) {
      const score = book?.scores.reduce((acc, current) => acc + current) / book?.scores.length;
      book.score = score;
      const { scores, ...rest } = book;

      return rest;
    }


    return;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};

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
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(input.bookId)
      }
    })

    if (!book?.returnedDay) {
      return;
    }

    const updateBook = await prisma.book.update({
      where: {
        id: parseInt(input.bookId)
      },
      data: {
        readerId: parseInt(input.userId),
        rentedDay: new Date(),
        returnedDay: null
      }
    });

    return updateBook;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};

export const returnBook = async (input: any) => {
  const { params: { bookId, userId }, body: { score } } = input;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId)
      }
    })

    if (book?.returnedDay) {
      return;
    }

    const updateBook = await prisma.book.update({
      where: {
        id: parseInt(bookId)
      },
      data: {
        readerId: parseInt(userId),
        returnedDay: new Date(),
        scores: {
          push: score
        }
      }
    });
    return updateBook;
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
  return;
};