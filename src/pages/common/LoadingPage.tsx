// LoadingPage.tsx

export default function LoadingPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <h4 className="mt-4">Loading...</h4>
      <p className="text-muted">Please wait while we prepare your session.</p>
    </div>
  );
}
