import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import createHttpError, { isHttpError } from "http-errors";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

import mongoose, { Error } from "mongoose";

/* Route imports */
import authRouter from "./routes/auth.route";
import rulesRouter from "./routes/rules.route";
import roundsRouter from "./routes/rounds.route";

import { authToken } from "./middlewares/authToken.middleware";

/* Server configuration */
dotenv.config();
const app = express();
app.use(express.json());

/* Server routes */
app.use("/api/auth", authRouter);
app.use("/api", authToken, rulesRouter);
app.use("/api", authToken, roundsRouter);

/* Unkown route handler */
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

/* Error handling */
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error instanceof JsonWebTokenError) {
    if (error.message === "invalid signature") {
      statusCode = 401;
      errorMessage = "Access denied, invalid token.";
    }
  }

  if (error instanceof ZodError) {
    statusCode = 401;
    errorMessage = error.errors[0].message;
  }

  if (error instanceof Error) {
    console.log(error);

    statusCode = 401;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

/* Port configuration */
const SERVER_PORT = process.env.SERVER_PORT || 5000;

/* Mongo connection */
mongoose
  .connect(process.env.DATABASE_CONNECTION_URL!)
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server on port: ${SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
