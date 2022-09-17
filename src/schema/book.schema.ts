import { object, string, TypeOf } from "zod";

export const createBookSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    })
  }),
});

export const borrowBookSchema = object({
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
    bookId: string({
      required_error: "bookId is required",
    })
  }),
});

export type CreateBookInput = TypeOf<typeof createBookSchema>;
export type BorrowBookInput = TypeOf<typeof borrowBookSchema>;