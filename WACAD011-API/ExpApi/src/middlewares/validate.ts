import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";
import { StatusCodes } from "http-status-codes";

function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
    else next();
  };
}

export default validate;
