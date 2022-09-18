import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, getUsers, getUser } from "../service/user.service";

export async function getUsersHandler(
  req: Request,
  res: Response
) {
  try {
    const user = await getUsers();
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function getUserHandler(
  req: Request,
  res: Response
) {
  try {
    const user = await getUser(req.params);
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}