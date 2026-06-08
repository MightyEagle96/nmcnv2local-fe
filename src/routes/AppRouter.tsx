import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AdminRoutes } from "./adminRoutes";

import { useAuth } from "./useAuth";
import { CandidateRoutes } from "./candidateRoutes";
import { ProcedureStationRoutes } from "./procedureStationRoutes";
import { QuestionStationRoutes } from "./questionStationRoutes";

import Navbar from "../components/AdminNavbar";

export const appRoles = {
  admin: "admin",
  candidate: "candidate",
  questionStation: "questionStation",
  procedureStation: "procedureStation",
};

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
  }

  return (
    <BrowserRouter>
      {user && user.role === appRoles.admin && <Navbar />}
      <Routes>
        <Route path="/*" element={<CandidateRoutes user={user} />} />
        <Route path="/admin/*" element={<AdminRoutes user={user} />} />
        <Route
          path="/procedurestation/*"
          element={<ProcedureStationRoutes user={user} />}
        />
        <Route
          path="/questionstation/*"
          element={<QuestionStationRoutes user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
