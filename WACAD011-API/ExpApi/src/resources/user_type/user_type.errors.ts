import type { Response } from "express";
import {
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "../../generated/prisma/internal/prismaNamespace.js";
import { StatusCodes } from "http-status-codes";

export function userTypeErrors(err: any, res: Response) {
  if (err instanceof PrismaClientValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Validation Error",
      message: "The data provided is invalid. ",
    });
  } else if (err instanceof PrismaClientUnknownRequestError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Database Error",
      message: err.message,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}
