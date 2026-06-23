import { useEffect, useState, forwardRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Fade,
  Dialog,
  Slide,
  DialogTitle,
  Alert,
  DialogContent,
  Avatar,
  DialogActions,
} from "@mui/material";

import type { TransitionProps } from "@mui/material/transitions";

import { Login, Person } from "@mui/icons-material";
import { httpService } from "../../httpService";
import { toastError } from "../../components/ErrorToast";
import { User, ShieldCheck } from "lucide-react";
import { base64ToBlobUrl } from "../../assets/imageToBlob";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Candidate = {
  name: string;
  indexNumber: string;
  programmes: { name: string; code: string }[];
};
function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [examinationNumber, setExaminationNumber] = useState("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const loginCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await httpService.post(`cbt/prelogin`, {
        indexNumber: examinationNumber,
      });

      if (data) {
        const { avatar, ...rest } = data;
        setCandidate(rest);

        if (avatar) {
          const blobUrl = base64ToBlobUrl(avatar, "image/jpeg");
          if (blobUrl) setImageUrl(blobUrl);
        }
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

  const handleClose = () => {
    setCandidate(null);
  };

  const handleProceed = () => {};

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
              type="submit"
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
      <Dialog
        fullWidth
        maxWidth="md"
        open={candidate !== null}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Verify Your Identity
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Please confirm that the details below belong to you before
            proceeding.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 3,
            }}
          >
            <Avatar
              src={imageUrl}
              sx={{
                width: 160,
                height: 160,
                border: "4px solid",
                borderColor: "primary.main",
                boxShadow: 3,
              }}
            >
              <User size={80} />
            </Avatar>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1,
              mb: 2,
            }}
          >
            {/* Candidate Info Card */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textWrap: "wrap",
                textBoxTrim: "ellipsis",
                mb: 1,
                textTransform: "capitalize",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Full Name
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, textTransform: "capitalize" }}
              >
                {candidate?.name}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                mb: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Examination Number
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, textTransform: "uppercase" }}
              >
                {candidate?.indexNumber}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {candidate?.programmes?.length > 1 ? "Programmes" : "Programme"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {candidate?.programmes.map((p) => p.name).join(", ")}
              </Typography>
            </Box>
          </Box>

          <Alert severity="warning" sx={{ mb: 2 }}>
            If these details are incorrect, do not continue. Contact the
            examination administrator immediately.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" color="success" onClick={handleClose}>
            Not My Details
          </Button>

          <Button variant="contained" color="success" onClick={handleProceed}>
            Proceed to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;
