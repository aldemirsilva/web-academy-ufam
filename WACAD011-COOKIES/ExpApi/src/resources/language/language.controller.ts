import type { Request, Response } from "express";
import type { ChangeLangDTO } from "./language.type.js";
import { StatusCodes } from "http-status-codes";

const changeLang = (req: Request, res: Response) => {
  const { lang } = req.body as ChangeLangDTO;
  res.cookie("lang", lang).status(StatusCodes.OK).json({ lang });
};

export default { changeLang };
