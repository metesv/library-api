import { Express } from "express";
import validateResource from "./middleware/validateResource";
import { 
  createUserHandler,
  getUsersHandler
} from "./controller/user.controller";
import { 
  getBooksHandler,
  createBookHandler,
  borrowBookHandler,
  returnBookHandler
} from "./controller/book.controller";
import { createUserSchema } from "./schema/user.schema";
import { 
  createBookSchema,
  borrowBookSchema,
  returnBookSchema
} from "./schema/book.schema";

function routes(app: Express) {
  // User methods
  app.get("/users", getUsersHandler);

  app.post("/users", validateResource(createUserSchema), createUserHandler);

  app.post("/users/:userId/borrow/:bookId", validateResource(borrowBookSchema), borrowBookHandler);

  app.post("/users/:userId/return/:bookId", validateResource(returnBookSchema), returnBookHandler);

  // Book methods
  app.get("/books", getBooksHandler);

  app.post("/books", validateResource(createBookSchema), createBookHandler);
}

export default routes;