import mongoose from "mongoose";

const hotsActivitySchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    question_id: {
      type: String,
      required: true
    },
    activity_format: {
      type: String,
      enum: ["essay", "matching"],
      required: true
    },
    essay_response: {
      type: String,
      required: function () {
        return this.activity_format === "essay";
      }
    },
    matching_response: {
      type: [
        {
          left: String,  // jawaban siswa untuk bagian kiri
          right: String  // pasangan yang dipilih
        }
      ],
      required: function () {
        return this.activity_format === "matching";
      }
    },
    submitted_at: {
      type: Date,
      default: Date.now
    },
    is_reviewed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const HotsActivity =
  mongoose.models.HotsActivity ||
  mongoose.model("HotsActivity", hotsActivitySchema);

export default HotsActivity;
