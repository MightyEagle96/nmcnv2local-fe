import { useEffect, useState } from "react";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";
import { Typography } from "@mui/material";

interface Examination {
  _id: string;
  __v: number;
  active: boolean;
  concluded: boolean;
  createdAt: string;
  createdBy: string;
  dateCreated: string;
  downloadTime: string;
  duration: number;
  name: string;
  programmes: string[];
  questionBanks: {
    programme: string;
    questionBank: string;
    _id: string;
  }[];
  scheduledTime: string;
  updatedAt: string;
}

interface Session {
  _id: string;
  cbtExamination: string;
  sessionName: string;
  sessionCode: string;
  sessionNumber: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  examination: Examination;
}
function MonitorExam() {
  const [examinationSession, setExaminationSession] = useState<Session | null>(
    null,
  );
  const getActiveSession = async () => {
    try {
      const { data } = await httpService.get("examination/activesession");
      console.log(data);

      setExaminationSession(data);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getActiveSession();
  }, []);
  return (
    <div className="p-3">
      {examinationSession ? (
        <>
          <div className="bg-light p-3 text-center">
            <Typography variant="overline" sx={{ color: "primary" }}>
              active session
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, textTransform: "uppercase" }}
            >
              {examinationSession.examination.name} (
              {examinationSession.sessionName})
            </Typography>
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default MonitorExam;
