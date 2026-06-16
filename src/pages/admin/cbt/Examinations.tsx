import { Button, Chip, Typography } from "@mui/material";
import { httpService } from "../../../httpService";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { Clear, Done, Pending, Upload } from "@mui/icons-material";
import { toastError } from "../../../components/ErrorToast";
import { toast } from "react-toastify";

type status = "not started" | "activated" | "completed" | "uploaded";
interface Session {
  _id: string;
  sessionName: string;
  sessionCode: string;
  sessionNumber: number;
  cbtExamination: string;
  status: status;
}

interface TestDrive {
  _id: string;
  active: boolean;
  name: string;
  activatedSessionNumber: number;
  scheduledTime: string; // ISO 8601 date string
  sessions: Session[];
}

// If you need the array type:
type TestDriveList = TestDrive[];
function Examinations() {
  const [examinations, setExaminations] = useState<TestDriveList>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [scheduledTime, setScheduledTime] = useState("");
  const [refresh, setRefresh] = useState(false);
  const getData = async () => {
    try {
      const { data } = await httpService("examination/viewlist");
      console.log(data);
      setExaminations(data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  function SwitchStatus(status: status) {
    switch (status) {
      case "not started":
        return <Chip icon={<Clear />} label={status} color="error" />;
      case "activated":
        return <Chip icon={<Pending />} label={status} color="warning" />;
      case "completed":
        return <Chip icon={<Done />} label={status} color="primary" />;
      case "uploaded":
        return <Chip icon={<Upload />} label={status} color="success" />;
      default:
        return <Chip label={status} />;
    }
  }

  const activateSession = async (session: Session) => {
    try {
      const { data } = await httpService.patch("examination/activatesession", {
        _id: session._id,
        cbtExamination: session.cbtExamination,
      });

      if (data) {
        setRefresh(!refresh);
        setSessions([]);
        toast.success(data);
      }
    } catch (error) {
      toastError(error);
    }
    console.log(session);
  };
  const renderActionButton = (session: Session, scheduledTime: string) => {
    switch (session.status) {
      case "not started":
        return (
          <Button
            variant="contained"
            color="warning"
            disabled={new Date(scheduledTime).getTime() >= new Date().getTime()}
            onClick={() => activateSession(session)}
          >
            Activate
          </Button>
        );

      case "activated":
        return (
          <Button
            variant="contained"
            color="error"
            //onClick={() => endSession(session)}
          >
            End Session
          </Button>
        );

      case "completed":
        return (
          <Button
            variant="contained"
            color="success"
            // onClick={() => uploadSession(session)}
          >
            Upload
          </Button>
        );

      case "uploaded":
        return (
          <Button variant="outlined" disabled>
            Uploaded
          </Button>
        );

      default:
        return null;
    }
  };
  return (
    <div className="bg-light py-5">
      <div className="px-5">
        <div className="bg-white p-4 mb-4 rounded shadow-sm">
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Examinations
          </Typography>
        </div>
        <div className="bg-white p-4 mb-4 rounded shadow-sm">
          <Table striped borderless className="align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Examinations</th>
                <th>Active</th>

                <th>Scheduled Time</th>
                <th>Active Session</th>
              </tr>
            </thead>
            <tbody>
              {examinations?.map((examination, index) => (
                <tr key={examination._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Typography
                      variant="h5"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {examination.name}
                    </Typography>
                    <Typography sx={{ color: "GrayText" }}>
                      {examination.sessions.length} session
                      {examination.sessions.length > 1 ? "s" : ""}
                    </Typography>
                  </td>
                  <td>{examination.active ? <Done /> : <Clear />}</td>

                  <td>
                    {new Date(examination.scheduledTime).toLocaleString()}
                  </td>
                  <td>
                    {examination.activatedSessionNumber}

                    <Button
                      onClick={() => {
                        setSessions(examination.sessions);
                        setScheduledTime(examination.scheduledTime);
                      }}
                    >
                      view session details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal
        show={sessions.length > 0}
        onHide={() => setSessions([])}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Examination Sessions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped borderless className="align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session._id}>
                  <td>{index + 1}</td>
                  <td>{session.sessionName}</td>
                  <td>{session.sessionCode}</td>
                  <td>{SwitchStatus(session.status)}</td>
                  <td>{renderActionButton(session, scheduledTime)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Examinations;
