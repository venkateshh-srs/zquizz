import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import QuizReport from "./pages/QuizReport";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-quiz/" element={<CreateQuiz />} />
      <Route path="/quiz-report/" element={<QuizReport />} />
    </Routes>
  );
}

export default AdminRoutes;
