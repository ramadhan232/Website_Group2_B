import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question_id: {
      type: String,
      required: true
    },
    
    chapter_number: {
      type: Number,
      required: true
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    comment: {
      type: String
    },
    scored_at: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);
export default Score;
