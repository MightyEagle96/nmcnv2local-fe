import { useEffect, useState } from "react";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";
import { Typography } from "@mui/material";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { Clear, Done } from "@mui/icons-material";

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
      setCandidatesCount(data.candidatesCount);
      console.log(data);
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
        // <span className="text-uppercase">
        //   {params.row.loggedInTime ? params.row.loggedInTime : "-"}
        // </span>
      ),
    },
  ];

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
