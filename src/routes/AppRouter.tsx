import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AdminRoutes } from "./adminRoutes";

import { useAuth } from "./useAuth";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes user={user} />} />
        {/* {routesToDisplay.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))} */}
      </Routes>
    </BrowserRouter>
  );
}
