import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export interface PayloadInterface {
  userId: string;
  iat: number;
}

/* Token authorization */
export const authToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets the token from the header */
    const authToken = req.header("Authorization");

    /* If there is no token throws an error */
    if (!authToken) {
      throw createHttpError(401, "Access denied, no token found.");
    }

    /* Verifies the token */
    const tokenPayload = jwt.verify(
      authToken,
      process.env.TOKEN_PRIVATE_KEY || ""
    ) as PayloadInterface;

    /* Saves the user id in the request */
    req.userId = tokenPayload.userId;

    next();
  } catch (error) {
    next(error);
  }
};
