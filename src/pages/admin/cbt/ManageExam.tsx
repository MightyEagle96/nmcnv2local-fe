import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Avatar,
  Alert,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";
import { Transition } from "../../candidates/LoginPage";
import { User } from "lucide-react";
import { base64ToBlobUrl } from "../../../assets/imageToBlob";
import { toast } from "react-toastify";

interface Candidate {
  firstName: string;
  middleName: string;
  lastName: string;
  indexNumber: string;
  programmes: string[];
}

function ManageExam() {
  const [indexNumber, setIndexNumber] = useState("");
  const [indexNumber2, setIndexNumber2] = useState("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const getCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await httpService.post("examination/getcandidate", {
        indexNumber,
      });

      const { avatar, ...rest } = data;
      setCandidate(rest);

      if (avatar) {
        if (avatar) {
          const blobUrl = base64ToBlobUrl(avatar, "image/jpeg");
          if (blobUrl) setImageUrl(blobUrl);
        }
      }

      console.log(data);
    } catch (error) {
      toastError(error);
    }

    console.log(indexNumber);
  };

  const handleClose = () => {
    setCandidate(null);
    setIndexNumber("");
    setImageUrl("");
  };

  const reloginCandidate = async () => {
    try {
      const { data } = await httpService.post("examination/relogincandidate", {
        indexNumber,
      });

      handleClose();
      toast.success(data);
    } catch (error) {
      toastError(error);
    }
  };

  const messageCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await httpService.post("examination/messagecandidate", {
        indexNumber: indexNumber2,
      });

      if (data) {
        toast.success(data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    // <div>
    //   <div className="container my-4">
    //     <div className="mb-4">
    //       <Typography variant="h4" sx={{ fontWeight: 800 }}>
    //         Manage Active Exam
    //       </Typography>
    //     </div>
    //     <div className="row d-flex align-items-center">
    //       <div className="col-lg-4">
    //         <div className="mb-3">
    //           <Typography gutterBottom variant="h6">
    //             {" "}
    //             Relogin Candidate
    //           </Typography>
    //         </div>
    //         <form onSubmit={getCandidate}>
    //           <TextField
    //             fullWidth
    //             required
    //             value={indexNumber}
    //             label="Examination Number"
    //             sx={{ mb: 2 }}
    //             onChange={(e) => setIndexNumber(e.target.value)}
    //           />
    //           <Button type="submit" variant="contained">
    //             Get Candidate
    //           </Button>
    //         </form>
    //       </div>
    //       <div className="col-lg-4">
    //         <div className="mb-3">
    //           <Typography gutterBottom variant="h6">
    //             Close Candidate Browser
    //           </Typography>
    //         </div>
    //         <form onSubmit={messageCandidate}>
    //           <TextField
    //             fullWidth
    //             required
    //             value={indexNumber2}
    //             label="Examination Number"
    //             sx={{ mb: 2 }}
    //             onChange={(e) => setIndexNumber2(e.target.value)}
    //           />
    //           <Button color="error" type="submit" variant="contained">
    //             Close browser
    //           </Button>
    //         </form>
    //       </div>
    //       <div className="col-lg-3">
    //         <Button color="warning">Relogin all candidates</Button>
    //       </div>
    //     </div>
    //   </div>
    //   <Dialog
    //     fullWidth
    //     maxWidth="md"
    //     open={candidate !== null}
    //     slots={{ transition: Transition }}
    //     keepMounted
    //     onClose={handleClose}
    //     // aria-describedby="alert-dialog-slide-description"
    //     role="alertdialog"
    //   >
    //     <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
    //       <Typography variant="h5" sx={{ fontWeight: 700 }}>
    //         Verify Candidate
    //       </Typography>

    //       <Typography variant="body2" color="text.secondary">
    //         Please confirm that this is the candidate you want to relog in.
    //       </Typography>
    //     </DialogTitle>
    //     <DialogContent>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           my: 3,
    //         }}
    //       >
    //         <Avatar
    //           src={imageUrl}
    //           sx={{
    //             width: 160,
    //             height: 160,
    //             border: "4px solid",
    //             borderColor: "primary.main",
    //             boxShadow: 3,
    //           }}
    //         >
    //           <User size={80} />
    //         </Avatar>
    //       </Box>

    //       <Box
    //         sx={{
    //           display: "grid",
    //           gridTemplateColumns: {
    //             xs: "1fr",
    //             sm: "1fr 1fr",
    //           },
    //           gap: 1,
    //           mb: 2,
    //         }}
    //       >
    //         {/* Candidate Info Card */}
    //         <Box
    //           sx={{
    //             p: 1.5,
    //             borderRadius: 2,
    //             border: "1px solid",
    //             borderColor: "divider",
    //             textWrap: "wrap",
    //             textBoxTrim: "ellipsis",
    //             mb: 1,
    //             textTransform: "capitalize",
    //             overflowWrap: "anywhere",
    //             wordBreak: "break-word",
    //           }}
    //         >
    //           <Typography variant="caption" color="text.secondary">
    //             Name
    //           </Typography>

    //           <Typography
    //             variant="subtitle1"
    //             sx={{ fontWeight: 700, textTransform: "capitalize" }}
    //           >
    //             {candidate?.firstName} {candidate?.middleName}{" "}
    //             {candidate?.lastName}
    //           </Typography>
    //         </Box>

    //         <Box
    //           sx={{
    //             p: 1.5,
    //             borderRadius: 2,
    //             border: "1px solid",
    //             borderColor: "divider",
    //             mb: 1,
    //           }}
    //         >
    //           <Typography variant="caption" color="text.secondary">
    //             Examination Number
    //           </Typography>

    //           <Typography
    //             variant="subtitle1"
    //             sx={{ fontWeight: 700, textTransform: "uppercase" }}
    //           >
    //             {candidate?.indexNumber}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     </DialogContent>
    //     <DialogActions sx={{ p: 3 }}>
    //       <Button variant="contained" color="error" onClick={handleClose}>
    //         Not the candidate
    //       </Button>
    //       <Button variant="outlined" color="success" onClick={reloginCandidate}>
    //         Relogin Candidate
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Manage Active Examination
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Perform real-time candidate session management during an active
          examination.
        </Typography>
      </Box>

      {/* Action Cards */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3} sx={{ mb: 4 }}>
        {/* Relogin Candidate */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Relogin Candidate
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Verify a candidate and force them to authenticate again.
            </Typography>

            <form onSubmit={getCandidate}>
              <TextField
                fullWidth
                required
                value={indexNumber}
                label="Examination Number"
                sx={{ mb: 2 }}
                onChange={(e) => setIndexNumber(e.target.value)}
              />

              <Button fullWidth type="submit" variant="contained" size="large">
                Verify Candidate
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Close Browser */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Close Candidate Browser
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Immediately terminate a candidate's active examination session.
            </Typography>

            <form onSubmit={messageCandidate}>
              <TextField
                fullWidth
                required
                value={indexNumber2}
                label="Examination Number"
                sx={{ mb: 2 }}
                onChange={(e) => setIndexNumber2(e.target.value)}
              />

              <Button
                fullWidth
                color="error"
                type="submit"
                variant="contained"
                size="large"
              >
                Close Browser
              </Button>
            </form>
          </CardContent>
        </Card>
      </Stack>

      {/* Bulk Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bulk Actions
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Apply actions to all candidates currently participating in the
            examination.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="contained" color="warning" size="large">
              Relogin All Candidates
            </Button>

            <Button variant="contained" color="error" size="large">
              Close All Browsers
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Candidate Verification Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={candidate !== null}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Verify Candidate
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Please confirm that this is the candidate you wish to relog.
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
              gap: 2,
              mb: 2,
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Candidate Name
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, textTransform: "capitalize" }}
                >
                  {candidate?.firstName} {candidate?.middleName}{" "}
                  {candidate?.lastName}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Examination Number
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, textTransform: "capitalize" }}
                >
                  {candidate?.indexNumber}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Optional status indicator */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Chip color="success" label="Online" variant="filled" />
          </Box>

          <Alert severity="warning">
            Relogging this candidate will terminate the current examination
            session and require the candidate to authenticate again before
            continuing.
          </Alert>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Not the Candidate
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={reloginCandidate}
          >
            Relogin Candidate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageExam;
