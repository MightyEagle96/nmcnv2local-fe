import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import LoginPage from "../pages/admin/LoginPage";
import { appRoles } from "./AppRouter";
import type { User } from "../context/AppUserContext";
import CbtDashboard from "../pages/admin/cbt/CbtDashboard";
import DownloadUpload from "../pages/admin/cbt/DownloadUpload";

const publicAdminRoutes = [{ path: "/", component: <LoginPage /> }];

const privateAdminRoutes = [
  { path: "/", component: <AdminDashboard /> },
  { path: "/cbt", component: <CbtDashboard /> },
  { path: "/cbt/download&upload", component: <DownloadUpload /> },
];

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

export function AdminRoutes({ user }: { user: User | null }) {
  if (user && user.role === appRoles.admin) {
    return <AdminPrivateRoutes />;
  }
  return <AdminPublicRoutes />;
}
