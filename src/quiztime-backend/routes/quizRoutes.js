import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// POST: save quiz result
router.post("/", async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET: all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
