import express from "express";
import PDF from "../models/PDF.js";

const router = express.Router();

// POST: upload PDF metadata
router.post("/", async (req, res) => {
  try {
    const pdf = await PDF.create(req.body);  // (filename, text, etc)
    res.json(pdf);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET: list PDFs
router.get("/", async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
