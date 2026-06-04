import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppUser } from "../context/AppUserContext";
import { AdminPublicRoutes, privateAdminRoutes } from "./adminRoutes";
import {
  CandidatePublicRoutes,
  privateCandidateRoutes,
} from "./candidateRoutes";
import {
  privateQuestionStationRoutes,
  QuestionStationRoutes,
} from "./questionStationRoutes";
import {
  privateProcedureStationRoutes,
  ProcedureStationRoutes,
} from "./procedureStationRoutes";

export const appRoles = {
  admin: "admin",
  candidate: "candidate",
  questionStation: "questionStation",
  procedureStation: "procedureStation",
};

export default function AppRouter() {
  const { user } = useAppUser();

  const privateRoutes = () => {
    if (!user) return [];
    if (user.role === appRoles.admin) return privateAdminRoutes;

    if (user.role === appRoles.candidate) return privateCandidateRoutes;

    if (user.role === appRoles.questionStation)
      return privateQuestionStationRoutes;

    if (user.role === appRoles.procedureStation)
      return privateProcedureStationRoutes;
    return [];
  };

  const publicRoutes = [
    { path: "/*", component: <CandidatePublicRoutes /> },
    { path: "/admin/*", component: <AdminPublicRoutes /> },
    { path: "/procedurestation/*", component: <ProcedureStationRoutes /> },
    { path: "/questionstation/*", component: <QuestionStationRoutes /> },
  ];

  const routesToDisplay = user ? privateRoutes() : publicRoutes;

  return (
    <BrowserRouter>
      <Routes>
        {routesToDisplay.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
