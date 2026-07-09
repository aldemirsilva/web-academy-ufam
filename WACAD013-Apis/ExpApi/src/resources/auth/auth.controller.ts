import type { Request, Response } from "express";
import { createUser, findUserByEmail } from "../user/user.service.js";
import type { CreateUserDTO } from "../user/user.types.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { LoginDTO } from "./auth.types.js";
import { checkCredentials } from "./auth.service.js";

const signup = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDTO;

  try {
    if (await findUserByEmail(data.email))
      return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    const user = await createUser({ ...data, userTypeId: data.userTypeId });
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch (error) {}
};

const login = async (req: Request, res: Response) => {
  const data = req.body as LoginDTO;
  try {
    const user = await checkCredentials(data);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    } else {
      req.session.uid = user.id;
      req.session.userTypeId = user.userTypeId;
    }
  } catch (error) {}
};
const logout = async (req: Request, res: Response) => {};

export default { signup, login, logout };
