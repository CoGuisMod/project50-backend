import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

import {
  createRoundSchema,
  readRoundSchema,
  updateRoundBodySchema,
  updateRoundQuerySchema,
} from "../validators/rounds.validator";
import RoundModel from "../models/round.model";

export const createRound: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets the user id */
    const userId = req.userId;

    /* Gets and validates the user inputs */
    const {
      current_round,
      rules,
      start_date,
      last_activity,
      end_date,
      failed,
      failed_rules,
    } = createRoundSchema.parse(req.body);

    /* Counts the number of rounds of the user */
    const round_number =
      (await RoundModel.countDocuments({ user_id: userId })) + 1;

    /* Creates the new round */
    const newRound = new RoundModel({
      round_number,
      current_round,
      rules,
      start_date,
      last_activity,
      end_date,
      failed,
      failed_rules,
      user_id: userId,
    });

    /* Set current round to false for all the documents */
    await RoundModel.updateMany(
      { user_id: userId },
      {
        current_round: false,
      }
    );

    /* Saves the round in the database */
    await newRound.save();

    /* Sends back the created round */
    res.status(200).json(newRound);
  } catch (error) {
    next(error);
  }
};

export const readRound: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { round_id } = readRoundSchema.parse(req.query);

    /* Find the round by the id and if found return the round, if not found return null */
    const round = await RoundModel.findById(round_id);

    /* If there is no round return an error */
    if (!round) {
      throw createHttpError(401, "Round not found");
    }

    /* Sends back the round */
    res.status(200).json(round);
  } catch (error) {
    next(error);
  }
};

export const updateRound: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { round_id } = updateRoundQuerySchema.parse(req.query);

    /* Gets and validates the user inputs */
    const { current_round, last_activity, end_date, failed, failed_rules } =
      updateRoundBodySchema.parse(req.body);

    /* Find the round by the id and if found updates it and return the round, if not found return null */
    const updatedRound = await RoundModel.findByIdAndUpdate(
      round_id,
      {},
      { new: true }
    );

    /* If there is no round return an error */
    if (!updatedRound) {
      throw createHttpError(401, "Round not found");
    }

    /* Sends back the updated round */
    res.status(200).json(updatedRound);
  } catch (error) {
    next(error);
  }
};

/* Reads all user rounds */
export const readRounds: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets the user id */
    const userId = req.userId;

    /* Finds all the user rounds */
    const rounds = await RoundModel.find({ user_id: userId });

    /* Sends back the find rounds */
    res.status(200).json(rounds);
  } catch (error) {
    next(error);
  }
};
