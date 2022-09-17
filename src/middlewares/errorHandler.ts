import { NextFunction, Request, Response } from "express";
import { errorTypeStatusCode, isAppError } from "../utils/errorUtils";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (isAppError(err)) {
    const statusCode = errorTypeStatusCode(err.type);
    return res.status(statusCode).send(err.message);
  }

  return res.sendStatus(500);
}
