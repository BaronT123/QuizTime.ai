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
import Signup from "./Signup";
import { Routes, Route } from "react-router-dom";

function App() {
 
 const [landingPageData, setLandingPageData] = useState({});
 const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  
  return (
    
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              

              {selectedQuiz ? (
                <QuizDetails
                  quiz={selectedQuiz}
                  onClose={() => setSelectedQuiz(null)}
                />
              ) : (
                <>
                <Header data={landingPageData.Header} />
                <FormQuiz />
                </>
              )}
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      

      <History onViewDetails={setSelectedQuiz} />
      
    </div>
    
    
  );
}

export default App
