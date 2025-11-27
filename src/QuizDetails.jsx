// import React from "react";
// import "./QuizDetails.css";
// function QuizDetails({ quiz, onClose }) {
//   if (!quiz) return null;

//   return (
//     <div className="quiz-details-page">
      
//       <p><strong>File:</strong> {quiz.pdfName}</p>
//       <p><strong>Date:</strong> {new Date(quiz.date).toLocaleString()}</p>
//       <p><strong>Score:</strong> {quiz.score}</p>

//       <div className="review-questions">
//         {Array.isArray(quiz.questions) && quiz.questions.map((q, i) => (
//           <div key={i} style={{ marginBottom: 12 }}>
//             <p><strong>Q{i + 1}:</strong> {q.question}</p>
//             <ul>
//               {q.options && Object.entries(q.options).map(([k, v]) => (
//                 <li key={k}>{k}) {v}</li>
//               ))}
//             </ul>
//             <p><em>Your answer:</em> {quiz.userAnswers?.[i] || 'Not answered'}</p>
//             <p><em>Correct:</em> {q.options?.[q.answer] || 'Unknown'}</p>
//             <button>Explain the answer</button>
//           </div>
//         ))}
//       </div>
//       <button onClick={onClose} style={{ marginBottom: 12 }}>Back</button>
//     </div>
//   );
// }



// export default QuizDetails;

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
          const userAnswer = quiz.userAnswers?.[i];

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

              <p className="user-answer">
                <em>Your answer:</em> {userAnswer || "Not answered"}
              </p>

              <p className="correct-answer">
                <em>Correct:</em> {correctAnswer}
              </p>

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
