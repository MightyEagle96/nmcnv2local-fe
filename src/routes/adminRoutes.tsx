import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/admin/LoginPage";

const publicAdminRoutes = [{ path: "/", component: <LoginPage /> }];

export const privateAdminRoutes = [
  { path: "/", component: <AdminDashboard /> },
];

export function AdminPublicRoutes() {
  return (
    <Routes>
      {publicAdminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}
