import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/procedureStation/LoginPage";
import ProcedureStationDashboard from "../pages/procedureStation/ProcedureStationDashboard";

const publicProcedureStationRoutes = [{ path: "/", component: <LoginPage /> }];

export const privateProcedureStationRoutes = [
  { path: "/", component: <ProcedureStationDashboard /> },
];
export function ProcedureStationRoutes() {
  return (
    <Routes>
      {publicProcedureStationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}
