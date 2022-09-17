import { Request, Response } from "express";
import { CreateBookInput, BorrowBookInput } from "../schema/book.schema";
import { createBook, borrowBook } from "../service/book.service";

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
    return res.send(book);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}