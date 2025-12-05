import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import QuizPage from "./pages/quiz/QuizPage";
import LearnPage from "./pages/learn/LearnPage";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
           
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/leaderboard" element={< LeaderBoard/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
