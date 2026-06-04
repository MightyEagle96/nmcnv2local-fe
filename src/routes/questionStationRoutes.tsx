import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/questionStation/LoginPage";
import QuestionStationDashboard from "../pages/questionStation/QuestionStationDashboard";

const publicQuestionStationRoutes = [{ path: "/", component: <LoginPage /> }];

export const privateQuestionStationRoutes = [
  { path: "/", component: <QuestionStationDashboard /> },
];
export function QuestionStationRoutes() {
  return (
    <Routes>
      {publicQuestionStationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}
