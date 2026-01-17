import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    pdfName: String,
    date: String,
    score: String,
    questions: Array,
    userAnswers: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
