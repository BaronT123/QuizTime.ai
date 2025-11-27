import React, { useState, useEffect } from "react";

function FormQuiz() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [form, setForm] = useState({
    number: "",
    questionType: "",
    difficulty: "",
  });
  const [file, setFile] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showResultTab, setShowResultTab] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("number", form.number);
    formData.append("questionType", form.questionType);
    formData.append("difficulty", form.difficulty);

    if (!file) {
      console.error("No file selected!");
      return;
    }

    formData.append("file", file);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/rag-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("✅ API Response:", result);

      setQuizData(result.questions || result);
      setShowQuestions(true);
    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
  };

  const handleAnswerChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  useEffect(() => {
    const handler = (e) => {
      const msg = e?.detail?.message || "This is Quiz Result Tab";
      setResultMessage(msg);
      setShowResultTab(true);
    };

    window.addEventListener("showQuizResult", handler);
    return () => window.removeEventListener("showQuizResult", handler);
  }, []);

  const evaluateQuiz = () => {
    if (quizSubmitted) return;

    let correctCount = 0;

    quizData.forEach((q, idx) => {
      if (answers[idx] === q.options[q.answer]) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizSubmitted(true);

    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    const newEntry = {
      pdfName: file ? file.name : "Unknown File",
      date: new Date().toISOString(),
      score: `${correctCount}/${quizData.length}`,
      questions: quizData,
      userAnswers: answers,
    };

    history.push(newEntry);
    localStorage.setItem("quizHistory", JSON.stringify(history));
  };

  return (
    <div className="form-container">
      {showResultTab ? (
        <h1>{resultMessage}</h1>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              className="btn btn-custom btn-lg page-scroll"
              onChange={handleFileChange}
            />

            <label htmlFor="number">Number of questions:</label>
            <select
              id="number"
              name="number"
              value={form.number}
              onChange={handleSelectChange}
            >
              <option value="">Select Number of questions</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>

            <label htmlFor="type">Type of questions:</label>
            <select
              id="type"
              name="questionType"
              value={form.questionType}
              onChange={handleSelectChange}
            >
              <option value="">Select a type</option>
              <option value="MCQ">MCQ</option>
              <option value="True or False">True or False</option>
              <option value="Both">Both</option>
            </select>

            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              name="difficulty"
              onChange={handleSelectChange}
              value={form.difficulty}
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Easy to Medium">Easy to Medium</option>
              <option value="Medium">Medium</option>
              <option value="Medium to Hard">Medium to Hard</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit">Submit</button>
          </form>

          {loading && <p>Loading questions...</p>}

          {showQuestions && Array.isArray(quizData) && quizData.length > 0 && (
            <div className="quiz">
              <h2>Quiz</h2>
              {quizData.map((q, idx) => (
                <div key={idx}>
                  <p>
                    {idx + 1}. {q.question}
                  </p>
                  {Object.entries(q.options).map(([key, value]) => (
                    <div key={key}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={value}
                          checked={answers[idx] === value}
                          onChange={() => handleAnswerChange(idx, value)}
                          disabled={quizSubmitted}
                        />
                        {key}) {value}
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              {!quizSubmitted && (
                <button onClick={evaluateQuiz}>Submit Quiz</button>
              )}

              {quizSubmitted && (
                <h3>
                  You scored {score} out of {quizData.length}
                </h3>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FormQuiz;
