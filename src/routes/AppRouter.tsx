import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "./useAuth";

import Navbar from "../components/AdminNavbar";
import LoadingPage from "../pages/common/LoadingPage";

import { AdminRoutes } from "./adminRoutes";
import { CandidateRoutes } from "./candidateRoutes";
import NotFoundPage from "../pages/common/NotFoundPage";

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
        <Route path="/*" element={<CandidateRoutes user={user} />} />
        <Route path="/admin/*" element={<AdminRoutes user={user} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
