import type { Request, Response } from "express";
import {
  createUserType,
  deleteUserType,
  getUserType,
  getUserTypes,
  updateUserType,
} from "./user_type.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { CreateUserTypeDTO } from "./user_type.types.js";
import { userTypeErrors } from "./user_type.errors.js";

const index = async (req: Request, res: Response) => {
  try {
    const user_types = await getUserTypes();
    return res.status(StatusCodes.OK).json(user_types);
  } catch (err) {
    userTypeErrors(err, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const new_user_type = await createUserType(req.body as CreateUserTypeDTO);
    if (!new_user_type) {
      return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
    return res.status(StatusCodes.CREATED).json(new_user_type);
  } catch (err) {
    userTypeErrors(err, res);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user_type = await getUserType(id);
    if (!user_type) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(user_type);
  } catch (err) {
    userTypeErrors(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body as CreateUserTypeDTO;
    const updated_user_type = await updateUserType(id, data);
    if (!updated_user_type) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(updated_user_type);
  } catch (err) {
    userTypeErrors(err, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted_user_type = await deleteUserType(id);

    if (!deleted_user_type)
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);

    res.status(StatusCodes.ACCEPTED).json(deleted_user_type);
  } catch (err) {
    userTypeErrors(err, res);
  }
};

export default { index, create, read, update, remove };
