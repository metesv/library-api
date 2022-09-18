import { Request, Response } from "express";
import { CreateBookInput, BorrowBookInput, ReturnBookInput } from "../schema/book.schema";
import { createBook, borrowBook, returnBook, getBooks, getBook } from "../service/book.service";

export async function getBooksHandler(
  req: Request,
  res: Response
) {
  try {
    const book = await getBooks();
    return res.send(book);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function getBookHandler(
  req: Request,
  res: Response
) {
  try {
    const book = await getBook(req.params);
    return res.send(book);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function createBookHandler(
  req: Request<{}, {}, CreateBookInput["body"]>,
  res: Response
) {
  try {
    const book = await createBook(req.body);
    return res.send(book);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function borrowBookHandler(
  req: Request<{}, {}, BorrowBookInput["params"]>,
  res: Response
) {
  try {
    const book = await borrowBook(req.params);
    if (!book) {
      throw new Error("Bad Request");    
    }
    return res.send(book);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

export async function returnBookHandler(
  req: Request<{}, {}, ReturnBookInput["params"]>,
  res: Response
) {
  try {
    const book = await returnBook(req);
    return res.send(book);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}