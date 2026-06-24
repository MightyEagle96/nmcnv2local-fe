import WifiOffIcon from "@mui/icons-material/WifiOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";

interface DisconnectPageProps {
  reconnect: () => void;
}

export default function DisconnectPage({ reconnect }: DisconnectPageProps) {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-lg border-0 text-center"
        style={{ maxWidth: 600 }}
      >
        <div className="card-body p-5">
          <WifiOffIcon color="error" sx={{ fontSize: 90 }} />

          <h2 className="mt-4">Connection Lost</h2>

          <p className="text-muted mt-3">
            The examination server is currently unreachable. Please do not close
            your browser or refresh the page.
          </p>

          <div className="alert alert-warning mt-4">
            Your examination session remains active. The system is attempting to
            reconnect automatically.
          </div>

          <div className="mt-4">
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={reconnect}
            >
              Retry Connection
            </Button>
          </div>

          <p className="small text-muted mt-4">
            If the issue persists, please notify the invigilator immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
