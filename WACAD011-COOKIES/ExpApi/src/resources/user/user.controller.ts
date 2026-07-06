import type { Request, Response } from "express";
import { createUser, getUser, getUsers } from "./user.service.js";
import type { CreateUserDTO } from "./user.types.js";
import { StatusCodes } from "http-status-codes";
import { userErrors } from "./user.errors.js";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    userErrors(error, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateUserDTO;
    const user = await createUser(data);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    userErrors(error, res);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await getUser(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    userErrors(error, res);
  }
};

const update = async (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
