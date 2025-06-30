import mongoose from "mongoose";

const literacySchema = new mongoose.Schema(
  {
    chapter_number: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true,
      enum: ["Descriptive", "Recount", "Explanation", "Procedure", "Narrative", "Exposition"]
    },
    text_source: {
      type: String, // Contoh: "Halaman 11–13"
    },
    text_content: {
      type: [String], // paragraf-paragraf teks
      required: true
    },
    objectives: {
      type: [String]
    },
    genre_features: {
      structure: {
        type: [String]
      },
      language_features: {
        type: [String]
      }
    },
    media: {
      images: [String], // opsional
      worksheet_url: String // opsional
    }
  },
  {
    timestamps: true
  }
);

const Literacy = mongoose.models.Literacy || mongoose.model("Literacy", literacySchema);
export default Literacy;
