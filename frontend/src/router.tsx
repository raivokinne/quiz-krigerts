import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StartQuiz from "./pages/StartQuiz";
import BrowseQuizzes from "./pages/BrowseQuizzes";
import Quiz from "./pages/Quiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/start-quiz",
    element: <StartQuiz />,
  },
  {
    path: "/browse-quizzes",
    element: <BrowseQuizzes />,
  },
  {
    path: "/quiz/:quizId",
    element: <Quiz />,
  },
]);
