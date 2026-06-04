import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/admin/LoginPage";
import { appRoles } from "./AppRouter";

const publicAdminRoutes = [{ path: "/", component: <LoginPage /> }];

const privateAdminRoutes = [{ path: "/", component: <AdminDashboard /> }];

function AdminPublicRoutes() {
  return (
    <Routes>
      {publicAdminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

function AdminPrivateRoutes() {
  return (
    <Routes>
      {privateAdminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

export function AdminRoutes({ user }: any) {
  if (user && user.role === appRoles.admin) {
    return <AdminPrivateRoutes />;
  }
  return <AdminPublicRoutes />;
}
