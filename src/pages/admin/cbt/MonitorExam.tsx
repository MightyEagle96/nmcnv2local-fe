import { useEffect, useState } from "react";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";
import { Stack, Typography, Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Clear, Done } from "@mui/icons-material";
import { CheckCheck, Pen, ShieldAlert, Users } from "lucide-react";

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

  const [candidates, setCandidates] = useState([]);
  const [candidatesCount, setCandidatesCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });
  const getActiveSession = async () => {
    try {
      const { data } = await httpService.get("examination/activesession");
      console.log(data);

      setExaminationSession(data);
    } catch (error) {
      toastError(error);
    }
  };

  const getCandidates = async () => {
    try {
      const { data } = await httpService.get(
        "examination/examinationsessioncandidates",
        {
          params: {
            page: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
          },
        },
      );

      setCandidates(data.candidates);
      setCandidatesCount(data.totalCandidates);
    } catch (error) {}
  };

  useEffect(() => {
    getActiveSession();

    getCandidates();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "indexNumber",
      headerName: "EXAMINATION NUMBER",
      width: 200,
      renderCell: (params: any) => (
        <span className="text-uppercase">{params.row.indexNumber}</span>
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      width: 300,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.firstName} {params.row.lastName}
        </span>
      ),
    },
    {
      field: "ipAddress",
      headerName: "IP ADDRESS",
      width: 150,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.ipAddress ? params.row.ipAddress : "-"}
        </span>
      ),
    },
    {
      field: "loginCount",
      headerName: "LOGIN COUNT",
      width: 150,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.loginCount ? params.row.loginCount : "-"}
        </span>
      ),
    },
    {
      field: "loggedInTime",
      headerName: "TIME STARTED",
      width: 150,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.loggedInTime ? params.row.loggedInTime : "-"}
        </span>
      ),
    },
    {
      field: "submittedTime",
      headerName: "TIME ENDED",
      width: 150,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.loggedInTime ? params.row.loggedInTime : "-"}
        </span>
      ),
    },
    {
      field: "submitted",
      headerName: "SUBMITTED",
      width: 150,
      renderCell: (params: any) => (
        <span className="text-uppercase">
          {params.row.submitted ? (
            <Done sx={{ color: "green" }} />
          ) : (
            <Clear sx={{ color: "red" }} />
          )}
        </span>
      ),
    },
  ];

  const stats = [
    {
      title: "Candidates",
      value: candidatesCount,
      icon: Users,
      bg: "#E3F2FD",
      color: "#1976D2",
    },
    {
      title: "Writing",
      value: candidatesCount,
      icon: Pen,
      bg: "#FFF3E0",
      color: "#F57C00",
    },
    {
      title: "Submitted",
      value: candidatesCount,
      icon: CheckCheck,
      bg: "#E8F5E9",
      color: "#2E7D32",
    },
    {
      title: "Infractions",
      value: candidatesCount,
      icon: ShieldAlert,
      bg: "#FFEBEE",
      color: "#D32F2F",
    },
  ];

  return (
    <div className="p-3">
      {examinationSession ? (
        <>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="overline"
              color="primary"
              sx={{
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              ACTIVE SESSION
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                textTransform: "uppercase",
                mt: 0.5,
              }}
            >
              {examinationSession.examination.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {examinationSession.sessionName}
            </Typography>
          </Paper>
          <div className="my-3">
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Paper
                    key={stat.title}
                    elevation={1}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>

                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: stat.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={24} color={stat.color} />
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </div>
          <div
            className=" my-3"
            style={{ height: "70vh", overflowY: "scroll" }}
          >
            <DataGrid
              rows={candidates}
              columns={columns}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              rowCount={candidatesCount}
            />
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default MonitorExam;
