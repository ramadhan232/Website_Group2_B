import mongoose from "mongoose";

const scoreSummarySchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    chapter_number: {
      type: Number, // 1–4
      required: false
    },
    average_score: {
      type: Number,
      required: true
    },
    total_questions: {
      type: Number,
      required: true
    },
    level: {
      type: String,
      enum: ["per_question", "per_chapter", "total"],
      required: true
    },
    generated_at: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const ScoreSummary =
  mongoose.models.ScoreSummary ||
  mongoose.model("ScoreSummary", scoreSummarySchema);

export default ScoreSummary;
