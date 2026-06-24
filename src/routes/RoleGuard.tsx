import type { JSX } from "react";
import type { User } from "../context/AppUserContext";
import { Navigate } from "react-router-dom";

export const RoleGuard = ({
  allowedRoles,
  user,
  element,
}: {
  allowedRoles: string[];
  user: User | null;
  element: JSX.Element;
}) => {
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return allowedRoles.includes(user.role) ? (
    element
  ) : (
    <Navigate to={"/unauthorized"} replace />
  );
};
