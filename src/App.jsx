import React from "react";
// import TestUpload from "./TestUpload";
import History from "./History";
import FormQuiz from "./Form1";
import QuizDetails from "./QuizDetails";
import { Navigation } from "./navigation";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import JsonData from "./data/data.json";
import "./App.css";

function App() {
 
 const [landingPageData, setLandingPageData] = useState({});
 const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  
  return (
    
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      {selectedQuiz ? (
        <QuizDetails quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      ) : (
        <FormQuiz />
      )}

      <History onViewDetails={setSelectedQuiz} />
    </div>
    
    
  );
}

export default App
