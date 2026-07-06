import type { Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { StatusCodes } from "http-status-codes";

export function userErrors(err: unknown, res: Response) {
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Validation Error",
      message: "The data provided is invalid.",
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Database Error",
      message: err.message,
    });
  } else if (err instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: err.message,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}
