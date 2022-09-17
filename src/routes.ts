import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createUserHandler } from "./controller/user.controller";
import { createBookHandler } from "./controller/book.controller";
import { createUserSchema } from "./schema/user.schema";
import { createBookSchema } from "./schema/book.schema";

function routes(app: Express) {
  app.post("/users", validateResource(createUserSchema), createUserHandler);

  app.post("/books", validateResource(createBookSchema), createBookHandler);
}

export default routes;