import { string, z } from "zod";

export const createRoundSchema = z.object(
  {
    current_round: z.boolean({
      required_error: "Current round is required.",
      invalid_type_error: "Current round must be a boolean.",
    }),
    rules: z.array(
      z
        .string({
          required_error: "Rule id is required.",
          invalid_type_error: "Rule id must be a string.",
        })
        .min(1, { message: "Rule id shouldn't be empty." }),
      {
        required_error: "Rules are required.",
        invalid_type_error: "Rules must be an array.",
      }
    ),
    start_date: z.coerce.date({
      required_error: "Start date is required.",
      invalid_type_error: "Start date must be a date.",
    }),
    last_activity: z.coerce.date({
      required_error: "Last activity is required.",
      invalid_type_error: "Last activity must be a date.",
    }),
    end_date: z
      .string({
        required_error: "End date is required.",
        invalid_type_error: "End date must be a string.",
      })
      .min(1, { message: "End date shouldn't be empty." }),
    failed: z.boolean({
      required_error: "Failed is required.",
      invalid_type_error: "Failed must be a boolean.",
    }),
    failed_rules: z.array(
      z
        .string({
          required_error: "Failed round id is required.",
          invalid_type_error: "Failed round id must be a string.",
        })
        .min(1, { message: "Failed rule id shouldn't be empty." }),
      {
        required_error: "Failed rules are required.",
        invalid_type_error: "Failed rules must be an array.",
      }
    ),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const readRoundSchema = z.object(
  {
    round_id: z
      .string({
        required_error: "Round id is required.",
        invalid_type_error: "Round id must be a string.",
      })
      .min(1, { message: "Round id shouldn't be empty." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const updateRoundQuerySchema = z.object(
  {
    round_id: z
      .string({
        required_error: "Round id is required.",
        invalid_type_error: "Round id must be a string.",
      })
      .min(1, { message: "Round id shouldn't be empty." }),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);

export const updateRoundBodySchema = z.object(
  {
    current_round: z.boolean().nullable(),
    last_activity: z.date().nullable(),
    end_date: z.string().nullable(),
    failed: z.string().nullable(),
    failed_rules: z.string().nullable(),
  },
  {
    required_error: "Data is required.",
    invalid_type_error: "Data must be an object.",
  }
);
