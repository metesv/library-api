import { object, string, TypeOf } from "zod";

export const createBookSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    })
  }),
});

export type CreateBookInput = TypeOf<typeof createBookSchema>;