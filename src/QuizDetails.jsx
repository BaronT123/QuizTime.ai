

import "./QuizDetails.css";
import React from "react";

function QuizDetails({ quiz, onClose }) {
  if (!quiz) return null;

  return (
    <div className="quiz-details-page">
      <p><strong>File:</strong> {quiz.pdfName}</p>
      <p><strong>Date:</strong> {new Date(quiz.date).toLocaleString()}</p>
      <p><strong>Score:</strong> {quiz.score}</p>

      <div className="review-questions">
        {quiz.questions.map((q, i) => {
          const correctAnswer = q.options[q.answer];
          const userAnswer = quiz.userAnswers?.[0]?.[i];

          return (
            <div key={i} className="question-block">
              <p><strong>Q{i + 1}:</strong> {q.question}</p>

              <ul className="options-list">
                {Object.entries(q.options).map(([k, v]) => {
                  let className = "";

                  if (v === correctAnswer) className = "correct";
                  if (v === userAnswer && v !== correctAnswer)
                    className = "incorrect";

                  return (
                    <li key={k} className={`option-item ${className}`}>
                      {k}) {v}
                    </li>
                  );
                })}
              </ul>

              

              <button className="explain-btn">Explain the answer</button>
            </div>
          );
        })}
      </div>

      <button onClick={onClose} className="back-btn">Back</button>
    </div>
  );
}

export default QuizDetails;
