# 🧠 QuizTime.ai

**Version:** 1.0.0  
**Status:** Active Development

QuizTime.ai is a full-stack AI-powered quiz generation platform that allows users to upload PDFs and instantly generate interactive quizzes. The application is designed to help users test their understanding of technical documents through dynamically generated questions and immediate feedback.

---

## 🚀 Features (v1.0.0)

- 📄 **PDF Upload**
  - Users can upload a PDF document to generate quiz questions.
  
- 🧠 **AI-Generated Quizzes**
  - Questions are generated dynamically using an LLM based on the uploaded document.
  - Supports configurable number of questions, question type, and difficulty.

- 📝 **Interactive Quiz Interface**
  - Users can select answers for each question.
  - Quizzes are rendered dynamically on the frontend using React.

- ✅ **Quiz Evaluation**
  - User responses are evaluated locally.
  - Final score is displayed after quiz submission.

- 📊 **Quiz History (Local Storage)**
  - Completed quizzes are saved in browser `localStorage`.
  - History includes:
    - PDF name
    - Date taken
    - Score
  - Users can view past quiz results and details.

- 🧩 **Modular Architecture**
  - React frontend
  - FastAPI backend
  - Clean separation of concerns for future scalability

---

## 🛠️ Tech Stack

**Frontend**
- React
- JavaScript
- CSS

**Backend**
- FastAPI (Python)
- OpenAI API (LLM-based quiz generation)

**Storage**
- Browser Local Storage (v1.0.0)

---

---

## 🔮 Roadmap

### **Version 1.1.0 (Upcoming)**

- 🗄️ **MongoDB Integration**
  - Replace localStorage with MongoDB for persistent quiz history.
  - Enable cross-session and multi-user support.

- 📚 **Answer Explanation with RAG**
  - When a user selects an incorrect answer, the system will:
    - Retrieve relevant content from the uploaded PDF using embeddings.
    - Generate an explanation grounded in the source document.
  - Reduces hallucinations and improves learning accuracy.

---

## 🎯 Goal

QuizTime.ai aims to combine AI, full-stack development, and retrieval-based learning to create a smarter and more reliable quiz-generation experience.


