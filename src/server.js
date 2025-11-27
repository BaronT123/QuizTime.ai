import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quiztime", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const quizSchema = new mongoose.Schema({
  pdfName: String,
  pdfUrl: String,
  score: Number,
  total: Number,
  timestamp: Date,
  questions: [
    {
      question: String,
      options: Object,
      answer: String,
      userAnswer: String,
    },
  ],
});

const QuizHistory = mongoose.model("QuizHistory", quizSchema);

// POST endpoint to save quiz
app.post("/api/save-quiz", async (req, res) => {
  try {
    const newQuiz = new QuizHistory(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save quiz" });
  }
});

// GET endpoint to fetch quiz history
app.get("/api/history", async (req, res) => {
  const quizzes = await QuizHistory.find().sort({ timestamp: -1 });
  res.json(quizzes);
});

app.listen(5000, () => console.log("Server running on port 5000"));
