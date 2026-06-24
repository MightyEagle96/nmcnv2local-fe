import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AdminRoutes } from "./adminRoutes";

import { useAuth } from "./useAuth";
import { CandidateRoutes } from "./candidateRoutes";
import { ProcedureStationRoutes } from "./procedureStationRoutes";
import { QuestionStationRoutes } from "./questionStationRoutes";

import Navbar from "../components/AdminNavbar";
import type { User } from "../context/AppUserContext";
import { RoleGuard } from "./RoleGuard";
import UnauthorizedPage from "../pages/common/UnauthorizedPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import LoadingPage from "../pages/common/LoadingPage";

export const appRoles = {
  admin: "admin",
  candidate: "candidate",
  questionStation: "questionStation",
  procedureStation: "procedureStation",
};

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      {user && user.role === appRoles.admin && <Navbar />}
      <Routes>
        <Route
          path="/*"
          element={
            <RoleGuard
              user={user}
              allowedRoles={[appRoles.candidate]}
              element={<CandidateRoutes user={user} />}
            />
          }
        />

        <Route
          path="/admin/*"
          element={
            <RoleGuard
              user={user}
              allowedRoles={[appRoles.admin]}
              element={<AdminRoutes user={user} />}
            />
          }
        />
        <Route
          path="/procedurestation/*"
          element={<ProcedureStationRoutes user={user} />}
        />
        <Route
          path="/questionstation/*"
          element={<QuestionStationRoutes user={user} />}
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export function RouteSwitcher(user: User | null) {
  if (user && user.role === appRoles.admin) {
    return <AdminRoutes user={user} />;
  }
  return <CandidateRoutes user={user} />;
}
