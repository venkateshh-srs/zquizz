import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import UserLogin from "./pages/UserLogin";
import UserResult from "./pages/UserResult";
function UserRoutes() {
  return (
    <Routes>
      <Route path="/login/:quizId" element={<UserLogin />}></Route>;
      <Route path="/quiz/:quizId" element={<Quiz />}></Route>;
      <Route path="/result/:quizId" element={<UserResult />}></Route>;
    </Routes>
  );
}

export default UserRoutes;
