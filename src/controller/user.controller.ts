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
    const user: any = await getUser(req.params);

    if (user) {
      const past = user?.books.filter((item: any) => {
        return Boolean(item.returnedDay);
      }).map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      })

      const present = user?.books.filter((item: any) => {
        return !Boolean(item.returnedDay);
      }).map((item: any) => {
        return {
          id: item.id,
          name: item.name
        }
      })

      user.books = {
        past,
        present
      }

      return res.send(user);
    } else {
      throw new Error("Bad Request");
    }
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    if (!user) {
      throw new Error("Bad Request");
    }
    return res.send(user);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}