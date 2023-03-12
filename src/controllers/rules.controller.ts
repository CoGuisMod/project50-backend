import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

import {
  createRuleSchema,
  readRuleSchema,
  deleteRuleSchema,
  updateRuleQuerySchema,
  updateRuleBodySchema,
} from "../validators/rules.validator";
import RuleModel from "../models/rule.model";

export const createRule: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets the user id */
    const userId = req.userId;

    /* Gets and validates the user inputs */
    const { content, on_use } = createRuleSchema.parse(req.body);

    /* Creates the new rule */
    const newRule = new RuleModel({
      content,
      on_use,
      user_id: userId,
    });

    /* Saves the user in the database */
    await newRule.save();

    /* Sends back the created rule */
    res.status(200).json(newRule);
  } catch (error) {
    next(error);
  }
};

export const readRule: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { rule_id } = readRuleSchema.parse(req.query);

    /* Find the rule by the id and if found return the rule, if not found return null */
    const rule = await RuleModel.findById(rule_id);

    /* If there is no rule return an error */
    if (!rule) {
      throw createHttpError(401, "Rule not found");
    }

    /* Sends back the rule */
    res.status(200).json(rule);
  } catch (error) {
    next(error);
  }
};

export const updateRule: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { rule_id } = updateRuleQuerySchema.parse(req.query);

    /* Gets and validates the user inputs */
    const { content, on_use } = updateRuleBodySchema.parse(req.body);

    /* Find the rule by the id and if found updates it and return the rule, if not found return null */
    const updatedRule = await RuleModel.findByIdAndUpdate(
      rule_id,
      {
        content,
        on_use,
      },
      { new: true }
    );

    /* If there is no rule return an error */
    if (!updatedRule) {
      throw createHttpError(401, "Rule not found");
    }

    /* Sends back the updated rule */
    res.status(200).json(updatedRule);
  } catch (error) {
    next(error);
  }
};

export const deleteRule: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets and validates the user inputs */
    const { rule_id } = deleteRuleSchema.parse(req.query);

    /* Find the rule by the id and if found deletes it and return the rule, if not found return null */
    const deletedRule = await RuleModel.findByIdAndDelete(rule_id);

    /* If there is no rule return an error */
    if (!deletedRule) {
      throw createHttpError(401, "Rule not found");
    }

    /* Sends back the deleted rule */
    res.status(200).json(deletedRule);
  } catch (error) {
    next(error);
  }
};

/* Reads all user rules */
export const readRules: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Gets the user id */
    const userId = req.userId;

    /* Finds all the user rules */
    const rules = await RuleModel.find({ user_id: userId });

    /* Sends back the find rules */
    res.status(200).json(rules);
  } catch (error) {
    next(error);
  }
};
