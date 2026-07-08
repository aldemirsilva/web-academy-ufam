import type { NextFunction, Request, Response } from "express";
import getEnv from "../utils/validateEnv.js";

function setCookieLang(req: Request, res: Response, next: NextFunction) {
  const env = getEnv();
  if (!("lang" in req.cookies)) res.cookie("lang", env.DEFAULT_LANG);
  next();
}

export default setCookieLang;
