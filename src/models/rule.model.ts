import { InferSchemaType, model, Schema } from "mongoose";

const ruleSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    on_use: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Rule = InferSchemaType<typeof ruleSchema>;

export default model<Rule>("Rule", ruleSchema);
