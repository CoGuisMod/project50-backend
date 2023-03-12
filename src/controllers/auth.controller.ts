import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { signupSchema, signinSchema } from "../validators/auth.validator";
import UserModel from "../models/user.model";

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { first_name, last_name, email, password } = signupSchema.parse(
      req.body
    );

    /* Find the user by the email and if found return the user, if not found return null */
    const findUser = await UserModel.findOne({ email });

    /* If the user exists returns an error */
    if (findUser) {
      throw createHttpError(401, "User already exist.");
    }

    /* Encrypts the password */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    /* Saves the user in the database */
    await newUser.save();

    /* Creates the json token */
    const authToken = jwt.sign(
      { userId: newUser._id },
      process.env.TOKEN_PRIVATE_KEY || ""
    );

    /* Sends back the created token */
    res.status(200).header("Authorization", authToken).json(authToken);
  } catch (error) {
    next(error);
  }
};

export const signin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { email, password } = signinSchema.parse(req.body);

    /* Find the user by the email and if found return the user, if not found return null */
    const user = await UserModel.findOne({ email });

    /* If there is no user return an error */
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    /* Compares the passwords */
    const doPasswordsMatch = await bcrypt.compare(password, user.password);

    /* If the passwords do not match return an error */
    if (!doPasswordsMatch) {
      throw createHttpError(401, "Password do not match");
    }

    /* Creates the json token */
    const authToken = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_PRIVATE_KEY || ""
    );

    /* Sends back the created token */
    res.status(200).header("Authorization", authToken).json(authToken);
  } catch (error) {
    next(error);
  }
};

/* Reads all users */
export const getUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Finds all the users */
    const users = await UserModel.find();

    /* Sends back the find users */
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
