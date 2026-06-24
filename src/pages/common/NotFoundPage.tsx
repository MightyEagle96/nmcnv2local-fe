// NotFoundPage.tsx

import { HomeLink } from "./UnauthorizedPage";

export default function NotFoundPage() {
  return (
    <div className="container vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 text-center">
          <h1 className="display-1 fw-bold text-danger">404</h1>

          <h3 className="mb-3">Page Not Found</h3>

          <p className="text-muted mb-4">
            The page you are looking for does not exist or has been moved.
          </p>

          <HomeLink />
        </div>
      </div>
    </div>
  );
}
