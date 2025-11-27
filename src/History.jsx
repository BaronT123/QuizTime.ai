import React, { useState, useEffect } from "react";
import "./History.css";

function History({ onViewDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const toggleHistory = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const stored = JSON.parse(localStorage.getItem("quizHistory")) || [];
      setHistory(stored.reverse()); // Show newest first
    }
  };

  const viewQuizDetails = (quiz) => {
    setSelectedQuiz(quiz);
    if (typeof onViewDetails === 'function') onViewDetails(quiz);
  };

  return (
    <>
      <button className="history-toggle" onClick={toggleHistory}>
        {isOpen ? "Close Results" : "Results"}
      </button>

      <div className={`history-panel ${isOpen ? "open" : ""}`}>
        <div className="history-content">
          <h3>Quiz History</h3>
          {history.length === 0 ? (
            <p>No quizzes taken yet.</p>
          ) : (
            <ul>
              {history.map((h, i) => (
                <li key={i} className="history-item">
                  <div className="quiz-summary">
                    <p><strong>File:</strong> {h.pdfName}</p>
                    <p><strong>Date:</strong> {new Date(h.date).toLocaleString()}</p>
                    <p><strong>Score:</strong> {h.score}</p>
                    <button 
                      onClick={() => viewQuizDetails(h)}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  </div>
                  
                  {/* {selectedQuiz === h && (
                    <div className="quiz-details">
                      <h4>Quiz Details</h4>
                      {h.questions.map((q, qIdx) => (
                        <div key={qIdx} className="question-review">
                          <p><strong>Q{qIdx + 1}:</strong> {q.question}</p>
                          <p>Your answer: {h.userAnswers[qIdx] || 'Not answered'}</p>
                          <p>Correct answer: {q.options[q.answer]}</p>
                        </div>
                      ))}
                    </div>
                  )} */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default History;