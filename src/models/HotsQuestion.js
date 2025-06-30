import mongoose from "mongoose";

const hotsQuestionSchema = new mongoose.Schema(
  {
    question_id: {
      type: String,
      required: true,
      unique: true // contoh: ch1-1
    },
    chapter_number: {
      type: Number,
      required: true
    },
    question_text: {
      type: String,
      required: true
    },
    activity_type: {
      type: String,
      required: true,
      enum: [
        "Analyzing",
        "Evaluating",
        "Creating",
        "Reflecting",
        "Interpreting",
        "Recognizing",
        "Classifying",
        "Applying"
      ]
    },
    activity_format: {
      type: String,
      required: true,
      enum: ["essay", "matching"]
    },
    expected_skills: {
      type: [String]
    },
    source: {
      type: String // e.g., "Task 5 – Hal. 34"
    }
  },
  {
    timestamps: true
  }
);

console.log('HotsQuestion model loaded');
const HotsQuestion = mongoose.models.HotsQuestion || mongoose.model("HotsQuestion", hotsQuestionSchema);
export default HotsQuestion;
