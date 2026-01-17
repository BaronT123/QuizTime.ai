import mongoose from "mongoose";

const PDFSchema = new mongoose.Schema({
  fileName: String,
  text: String,
  embeddingIds: [String],   // if using vector DB later
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PDF", PDFSchema);
