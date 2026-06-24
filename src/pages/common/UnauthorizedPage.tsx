// UnauthorizedPage.tsx

import { Link } from "react-router-dom";
import { useAppUser } from "../../context/AppUserContext";
import { appRoles } from "../../routes/AppRouter";

export default function UnauthorizedPage() {
  return (
    <div className="container vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 text-center">
          <h1 className="display-1 fw-bold text-warning">403</h1>

          <h3 className="mb-3">Access Denied</h3>

          <p className="text-muted mb-4">
            You do not have permission to access this resource.
          </p>

          <HomeLink />
        </div>
      </div>
    </div>
  );
}

export const HomeLink = () => {
  const { user } = useAppUser();

  const getHomePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case appRoles.admin:
        return "/admin";

      case appRoles.candidate:
        return "/cbt";

      case appRoles.procedureStation:
        return "/procedurestation";

      case appRoles.questionStation:
        return "/questionstation";

      default:
        return "/";
    }
  };
  return (
    <Link to={getHomePath()} className="btn btn-primary">
      Go Home
    </Link>
  );
};
