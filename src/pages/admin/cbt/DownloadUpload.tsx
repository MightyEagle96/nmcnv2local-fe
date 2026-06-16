import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  LinearProgress,
  Card,
  Chip,
  CardContent,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";
import { useNavigate } from "react-router-dom";

type DownloadStatus = "pending" | "loading" | "success" | "error";

interface ISyncStatus {
  examination: DownloadStatus;
  programmes: DownloadStatus;
  questionBanks: DownloadStatus;
  sessions: DownloadStatus;
  candidates: DownloadStatus;
}

export default function DownloadUpload() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<ISyncStatus>({
    examination: "pending",
    programmes: "pending",
    questionBanks: "pending",
    sessions: "pending",
    candidates: "pending",
  });

  const updateStatus = (key: keyof ISyncStatus, status: DownloadStatus) => {
    setSyncStatus((prev) => ({
      ...prev,
      [key]: status,
    }));
  };

  // Simulated API call
  // const fakeDownload = (name: string, delay = 1200) =>
  //   new Promise((resolve) => setTimeout(() => resolve(`${name} done`), delay));

  const navigate = useNavigate();

  const downloadExamination = async () => {
    updateStatus("examination", "loading");

    try {
      const { data } = await httpService.get("download/examination");

      updateStatus("examination", "success");

      toast.success(data);
      setProgress(20);
    } catch (error) {
      updateStatus("examination", "error");

      throw error;
      //toastError(error);
    }
  };

  const downloadProgrammes = async () => {
    updateStatus("programmes", "loading");
    try {
      const { data } = await httpService.get("download/programmes");

      updateStatus("programmes", "success");
      toast.success(data);
      setProgress(40);
    } catch (error) {
      updateStatus("programmes", "error");
      throw error;
      //toastError(error);
    }
  };

  const downloadQuestionBanks = async () => {
    updateStatus("questionBanks", "loading");
    try {
      const { data } = await httpService.get("download/questionbanks");

      updateStatus("questionBanks", "success");
      toast.success(data);
      setProgress(60);
    } catch (error) {
      updateStatus("questionBanks", "error");
      throw error;
      //toastError(error);
    }
  };

  const downloadSessions = async () => {
    updateStatus("sessions", "loading");
    try {
      const { data } = await httpService.get("download/sessions");

      updateStatus("sessions", "success");

      toast.success(data);
      setProgress(80);
    } catch (error) {
      updateStatus("sessions", "error");
      throw error;
      //toastError(error);
    }
  };

  const downloadCandidates = async () => {
    updateStatus("candidates", "loading");
    try {
      const { data } = await httpService.get("download/candidates");

      updateStatus("candidates", "success");
      toast.success(data);
      setProgress(100);
    } catch (error) {
      updateStatus("candidates", "error");
      throw error;
      //toastError(error);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setProgress(0);

    try {
      // 1. Exams
      setStep("Downloading Examinations...");
      await downloadExamination();

      setStep("Downloading Programmes...");
      await downloadProgrammes();

      setStep("Downloading Question banks...");
      await downloadQuestionBanks();

      setStep("Downloading Sessions...");
      await downloadSessions();

      setStep("Downloading Candidates...");
      await downloadCandidates();

      setStep("All downloads completed");
      toast.success("Sync completed successfully 🚀");

      setTimeout(() => {
        navigate("/admin/cbt/examinations");
      }, 1500);
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  const getDownloadSummary = async () => {
    try {
      const response = await httpService("/download/summary");

      if (response.data) {
        console.log(response.data);
        setSyncStatus(response.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getDownloadSummary();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle, #0f172a, #020617)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(15,23,42,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            color: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Data Synchronization
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
            Secure sync from central server to local system
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={handleDownload}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                "&:hover": {
                  background: "linear-gradient(90deg, #172554, #1d4ed8)",
                },
              }}
            >
              {loading ? "Syncing..." : "Start Sync"}
            </Button>

            <Stack spacing={1.5} sx={{ mt: 3 }}>
              <StatusCard title="Examination" status={syncStatus.examination} />

              <StatusCard title="Programmes" status={syncStatus.programmes} />

              <StatusCard
                title="Question Banks"
                status={syncStatus.questionBanks}
              />

              <StatusCard title="Sessions" status={syncStatus.sessions} />

              <StatusCard title="Candidates" status={syncStatus.candidates} />
            </Stack>
            {loading && (
              <>
                <Typography sx={{ fontSize: 14 }}>{step}</Typography>

                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

function StatusCard({
  title,
  status,
}: {
  title: string;
  status: DownloadStatus;
}) {
  const color =
    status === "success"
      ? "success"
      : status === "error"
        ? "error"
        : status === "loading"
          ? "warning"
          : "default";

  return (
    <Card
      sx={{
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.5,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Typography sx={{ color: "white" }}>{title}</Typography>

        <Chip
          label={status}
          color={color}
          size="small"
          sx={{ color: "whitesmoke" }}
        />
      </CardContent>
    </Card>
  );
}
