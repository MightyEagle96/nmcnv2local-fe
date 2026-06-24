import type { User } from "../context/AppUserContext";
import CandidateExamPage from "../pages/candidates/CandidateExamPage";
import LoginPage from "../pages/candidates/LoginPage";
import { Route, Routes } from "react-router-dom";
import { appRoles } from "./AppRouter";
import NotFoundPage from "../pages/common/NotFoundPage";
import UnauthorizedPage from "../pages/common/UnauthorizedPage";

const publicRoutes = [
  { path: "/", component: <LoginPage /> },
  { path: "*", component: <NotFoundPage /> },
];

export const privateCandidateRoutes = [
  { path: "/", component: <CandidateExamPage /> },
  { path: "*", component: <NotFoundPage /> },
];

function CandidatePublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

function CandidatePrivateRoutes() {
  return (
    <Routes>
      {privateCandidateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

export function CandidateRoutes({ user }: { user: User | null }) {
  if (user && user.role !== appRoles.candidate) {
    return <UnauthorizedPage />;
  }

  if (user && user.role === appRoles.candidate) {
    return <CandidatePrivateRoutes />;
  }
  return <CandidatePublicRoutes />;
}
