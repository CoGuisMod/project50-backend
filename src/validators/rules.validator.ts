import { z } from "zod";

export const createRuleSchema = z.object(
  {
    content: z
      .string({
        required_error: "Content is required.",
        invalid_type_error: "Content must be a string.",
      })
      .min(1, { message: "Content shouldn't be empty." }),
    on_use: z.boolean({
      required_error: "On use is required.",
      invalid_type_error: "On use must be a boolean.",
    }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const readRuleSchema = z.object(
  {
    rule_id: z
      .string({
        required_error: "Rule id is required.",
        invalid_type_error: "Rule id must be a string.",
      })
      .min(1, { message: "Rule id shouldn't be empty." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const updateRuleQuerySchema = z.object(
  {
    rule_id: z
      .string({
        required_error: "Rule id is required.",
        invalid_type_error: "Rule id must be a string.",
      })
      .min(1, { message: "Rule id shouldn't be empty." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const updateRuleBodySchema = z.object(
  {
    content: z
      .string({
        required_error: "Content is required.",
        invalid_type_error: "Content must be a string.",
      })
      .min(1, { message: "Content shouldn't be empty." }),
    on_use: z.boolean({
      required_error: "On use is required.",
      invalid_type_error: "On use must be a boolean.",
    }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const deleteRuleSchema = z.object(
  {
    rule_id: z
      .string({
        required_error: "Rule id is required.",
        invalid_type_error: "Rule id must be a string.",
      })
      .min(1, { message: "Rule id shouldn't be empty." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);
