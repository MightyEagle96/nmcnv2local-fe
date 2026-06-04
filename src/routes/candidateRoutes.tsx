import CandidateExamPage from "../pages/candidates/CandidateExamPage";
import LoginPage from "../pages/candidates/LoginPage";
import { Route, Routes } from "react-router-dom";

const publicRoutes = [{ path: "/", component: <LoginPage /> }];

export const privateCandidateRoutes = [
  { path: "/", component: <CandidateExamPage /> },
];

export function CandidatePublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}
