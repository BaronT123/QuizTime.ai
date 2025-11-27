import React, { useState, useEffect } from "react";

const Quiz = ({ quizData }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizData && quizData.questions) {
      setQuestions(quizData.questions);
      setLoading(false);
    }
  }, [quizData]);

  const handleChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="quiz">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 p-4 border rounded-lg shadow-sm">
          <p className="font-medium mb-2">
            {q.id}. {q.question}
          </p>
          {/* If options is an array */}
          {Array.isArray(q.options)
            ? q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />{" "}
                  {opt}
                </label>
              ))
            // If options is an object
            : Object.entries(q.options).map(([key, value]) => (
                <label key={key} className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={value}
                    checked={answers[q.id] === value}
                    onChange={() => handleChange(q.id, value)}
                  />{" "}
                  {key}) {value}
                </label>
              ))}
        </div>
      ))}

      <pre className="mt-4 p-2 bg-gray-100 rounded">
        {JSON.stringify(answers, null, 2)}
      </pre>
    </div>
  );
};

export default Quiz;
