import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  getUser,
  getUsers,
  updateUser,
} from "./user.service.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.types.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userErrors } from "./user.errors.js";
import { prisma } from "../../utils/prismaClient.js";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    userErrors(error, res);
  }
};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDTO;
  try {
    if (await findUserByEmail(data.email))
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);

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

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const newUser: UpdateUserDTO = {
      name: req.body.name,
      email: req.body.email,
      userTypeId: req.body.userTypeId,
    };

    const updatedUser = await updateUser(id, newUser);

    if (!updatedUser)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    userErrors(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deletedUser = await deleteUser(id);

    if (!deletedUser)
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);

    return res.status(StatusCodes.ACCEPTED).json(deletedUser);
  } catch (error) {
    userErrors(error, res);
  }
};

export default { index, create, read, update, remove };
