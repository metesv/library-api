import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.post("/users", validateResource(createUserSchema), createUserHandler);
}

export default routes;