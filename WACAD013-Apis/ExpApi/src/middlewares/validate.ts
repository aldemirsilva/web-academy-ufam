import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";
import { StatusCodes } from "http-status-codes";

function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Validation Error",
        details: error.details.map(({ message, path }) => ({ message, path })),
      });
    }
    return next();
  };
}

export default validate;
