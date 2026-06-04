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

function LoginPage() {
  const [mounted, setMounted] = useState(false);

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
          "linear-gradient(135deg, #451a03 0%, #92400e 50%, #f59e0b 100%)",
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
              color="warning"
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
                Question Station Interface
              </Typography>
            </div>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default LoginPage;
