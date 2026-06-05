import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/questionStation/LoginPage";
import QuestionStationDashboard from "../pages/questionStation/QuestionStationDashboard";
import type { User } from "../context/AppUserContext";
import { appRoles } from "./AppRouter";

const publicRoutes = [{ path: "/", component: <LoginPage /> }];

export const privateRoutes = [
  { path: "/", component: <QuestionStationDashboard /> },
];
function PublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

function PrivateRoutes() {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

export function QuestionStationRoutes({ user }: { user: User | null }) {
  if (user && user.role === appRoles.questionStation) {
    return <PrivateRoutes />;
  }
  return <PublicRoutes />;
}
