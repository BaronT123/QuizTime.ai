import React, { useState } from "react";
import "./History.css";

function History({ onViewDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleHistory = async () => {
    setIsOpen((prev) => !prev);

    // Fetch only when opening
    if (!isOpen) {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/quizzes");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch quiz history", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const viewQuizDetails = (quiz) => {
    if (typeof onViewDetails === "function") {
      onViewDetails(quiz);
    }
    setIsOpen(false); // close panel when viewing details
  };

  return (
    <>
      <button className="history-toggle" onClick={toggleHistory}>
        {isOpen ? "Close Results" : "Results"}
      </button>

      <div className={`history-panel ${isOpen ? "open" : ""}`}>
        <div className="history-content">
          <h3>Quiz History</h3>

          {loading ? (
            <p>Loading...</p>
          ) : history.length === 0 ? (
            <p>No quizzes taken yet.</p>
          ) : (
            <ul>
              {history.map((h) => (
                <li key={h._id} className="history-item">
                  <div className="quiz-summary">
                    <p>
                      <strong>File:</strong> {h.pdfName}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(h.date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Score:</strong> {h.score}
                    </p>

                    <button
                      onClick={() => viewQuizDetails(h)}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  </div>
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
