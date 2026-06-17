import { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Fade,
} from "@mui/material";

import { Login, Person } from "@mui/icons-material";
import { httpService } from "../../httpService";
import { toastError } from "../../components/ErrorToast";

function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [examinationNumber, setExaminationNumber] = useState("");

  const loginCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await httpService.post(`cbt/prelogin`, {
        indexNumber: examinationNumber,
      });

      if (data) {
        console.log(data);
      }
    } catch (error) {
      toastError(error);
    }
    console.log({ examinationNumber });
    // window.location.assign(`/candidates/${examinationNumber}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)",
        px: 2,
      }}
    >
      <Fade in={mounted} timeout={900}>
        <Paper
          elevation={10}
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "40%",
            },
            p: 5,
            borderRadius: 4,
            backgroundColor: "#fff",
            animation: "fadeUp 0.8s ease",

            "@keyframes fadeUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(40px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Typography
            sx={{
              typography: "h4",
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
            }}
          >
            Welcome Back, Candidate
          </Typography>

          <Typography
            sx={{
              typography: "body1",
              textAlign: "center",
              color: "text.secondary",
              mb: 4,
            }}
          >
            Login to continue
          </Typography>

          <Box
            onSubmit={loginCandidate}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label="Examination Number"
              placeholder="Enter Examination number"
              onChange={(e) => setExaminationNumber(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              color="success"
              endIcon={<Login />}
              sx={{
                py: 1.7,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Login
            </Button>
            <div className="my-2 text-center">
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                CBT Interface
              </Typography>
            </div>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default LoginPage;
