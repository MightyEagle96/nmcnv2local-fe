import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";

export default function DownloadUpload() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [progress, setProgress] = useState(0);

  // Simulated API call
  // const fakeDownload = (name: string, delay = 1200) =>
  //   new Promise((resolve) => setTimeout(() => resolve(`${name} done`), delay));

  const downloadExamination = async () => {
    try {
      const { data } = await httpService.get("download/examination");

      toast.success(data);
      setProgress(20);
    } catch (error) {
      throw error;
      //toastError(error);
    }
  };

  const downloadProgrammes = async () => {
    try {
      const { data } = await httpService.get("download/programmes");

      toast.success(data);
      setProgress(40);
    } catch (error) {
      throw error;
      //toastError(error);
    }
  };

  const downloadQuestionBanks = async () => {
    try {
      const { data } = await httpService.get("download/questionbanks");

      toast.success(data);
      setProgress(60);
    } catch (error) {
      throw error;
      //toastError(error);
    }
  };

  const downloadSessions = async () => {
    try {
      const { data } = await httpService.get("download/sessions");

      toast.success(data);
      setProgress(80);
    } catch (error) {
      throw error;
      //toastError(error);
    }
  };

  const downloadCandidates = async () => {
    try {
      const { data } = await httpService.get("download/candidates");

      toast.success(data);
      setProgress(100);
    } catch (error) {
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
      // await fakeDownload("exams");
      // setProgress(25);
      // toast.success("Examinations downloaded successfully");

      // // 2. Candidates
      // setStep("Downloading Candidates...");
      // await fakeDownload("candidates");
      // setProgress(60);
      // toast.success("Candidates downloaded successfully");

      // // 4. Sessions
      // setStep("Downloading Sessions...");
      // await fakeDownload("sessions");
      // setProgress(100);
      //toast.success("Sessions downloaded successfully");

      setStep("All downloads completed");
      toast.success("Sync completed successfully 🚀");
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

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
