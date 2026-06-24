import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Fade,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Login,
  Business,
  Lock,
} from "@mui/icons-material";
import { toastError } from "../../components/ErrorToast";
import { httpService } from "../../httpService";
import { toast } from "react-toastify";

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginCentre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(userData);

    try {
      const { data } = await httpService.post("/centre/login", userData);

      toast.success(data);
      window.location.assign("/admin");
    } catch (error) {
      toastError(error);
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
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
            Welcome Back, Admin
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

          <form onSubmit={loginCentre}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                label="Centre ID"
                placeholder="Enter Centre ID"
                onChange={(e) =>
                  setUserData({ ...userData, centreId: e.target.value })
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                fullWidth
                size="large"
                variant="contained"
                endIcon={<Login />}
                type="submit"
                loading={loading}
                loadingPosition="end"
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
            </Box>
          </form>
          <div className="my-2 text-center">
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Admin Interface
            </Typography>
          </div>
        </Paper>
      </Fade>
    </Box>
  );
}

export default AdminLoginPage;
