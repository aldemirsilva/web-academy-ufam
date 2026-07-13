import type { Request, Response } from "express";
import { createUser, findUserByEmail } from "../user/user.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { LoginDTO, SignUpDTO } from "./auth.types.js";
import { checkCredentials } from "./auth.service.js";
import { UserTypes } from "../user_type/user_type.constants.js";
import { authErrors } from "./auth.errors.js";

const signup = async (req: Request, res: Response) => {
  const data = req.body as SignUpDTO;
  try {
    if (await findUserByEmail(data.email))
      return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    const user = await createUser({
      ...data,
      userTypeId: UserTypes.CLIENT,
    });
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    authErrors(error, res);
  }
};

const login = async (req: Request, res: Response) => {
  const data = req.body as LoginDTO;
  try {
    const user = await checkCredentials(data);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    } else {
      req.session.uid = user.id;
      req.session.userTypeId = user.userTypeId;
      return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    }
  } catch (error) {
    authErrors(error, res);
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
    res.clearCookie("sid");
    res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  });
};

export default { signup, login, logout };
