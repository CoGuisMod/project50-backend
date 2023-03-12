import { InferSchemaType, model, Schema } from "mongoose";

const roundSchema = new Schema(
  {
    round_number: {
      type: Number,
      required: true,
    },
    current_round: {
      type: Boolean,
      required: true,
    },
    rules: {
      type: Array<String>,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    last_activity: {
      type: Date,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    failed: {
      type: Boolean,
      required: true,
    },
    failed_rules: {
      type: Array<String>,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Round = InferSchemaType<typeof roundSchema>;

export default model<Round>("Round", roundSchema);
