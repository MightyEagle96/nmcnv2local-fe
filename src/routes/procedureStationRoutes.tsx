import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/procedureStation/LoginPage";
import ProcedureStationDashboard from "../pages/procedureStation/ProcedureStationDashboard";
import { appRoles } from "./AppRouter";
import type { User } from "../context/AppUserContext";
import NotFoundPage from "../pages/common/NotFoundPage";

const publicRoutes = [
  { path: "/", component: <LoginPage /> },
  { path: "*", component: <NotFoundPage /> },
];
const privateRoutes = [
  { path: "/", component: <ProcedureStationDashboard /> },
  { path: "*", component: <NotFoundPage /> },
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

export function ProcedureStationRoutes({ user }: { user: User | null }) {
  if (user && user.role === appRoles.procedureStation) {
    return <PrivateRoutes />;
  }
  return <PublicRoutes />;
}
