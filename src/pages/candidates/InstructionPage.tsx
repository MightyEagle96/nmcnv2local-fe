import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

import { toastError } from "../../components/ErrorToast";
import { httpService } from "../../httpService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface ExamState {
  examination: {
    _id: string;
    name: string;
  };
  duration: number; // in milliseconds
  questionBanks: Array<{
    _id: string;
    programme: {
      _id: string;
      name: string;
    };
    questionsCount: number;
  }>;
  totalQuestions: number;
}
function InstructionPage() {
  const [accepted, setAccepted] = useState(false);
  const [summary, setSummary] = useState<ExamState | null>(null);

  // const { user } = useAppUser();

  const getData = async () => {
    try {
      const { data } = await httpService("cbt/instructionsummary");

      setSummary(data);
      console.log(data);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">Examination Instructions</h3>
        </div>

        <div className="card-body">
          <div className="alert alert-warning border-0">
            <strong>Important:</strong> Please read all instructions carefully
            before proceeding.
          </div>

          <h5>General Information</h5>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Examination</th>
                <td className="text-capitalize">{summary?.examination.name}</td>
              </tr>

              <tr>
                <th>Duration</th>
                <td>{summary?.duration} Minutes</td>
              </tr>

              <tr>
                <th>Papers</th>
                <td>{summary?.questionBanks.length}</td>
              </tr>

              <tr>
                <th>Number of Questions</th>
                <td>{summary?.totalQuestions} Questions</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h5>Instructions</h5>

          <ol className="lh-lg">
            <li>
              Ensure that you are seated comfortably before starting the
              examination.
            </li>

            <li>Carefully read each question before selecting an answer.</li>

            <li>
              Use the navigation buttons provided to move between questions.
            </li>

            <li>
              You may review and change your answers before final submission.
            </li>

            <li>
              The examination timer will start immediately after clicking the
              Start Examination button.
            </li>

            <li>
              Once the allotted time expires, your examination will be submitted
              automatically.
            </li>

            <li>
              Do not refresh, close, or navigate away from the examination
              window.
            </li>

            <li>
              Any attempt to engage in examination malpractice may lead to
              disqualification.
            </li>

            <li>
              Ensure your computer remains powered throughout the examination.
            </li>

            <li>
              Contact an invigilator immediately if you experience technical
              issues.
            </li>
          </ol>

          <div className="alert alert-danger mt-4 border-0">
            <strong>Warning:</strong> Multiple login attempts, impersonation,
            unauthorized access, or any form of examination misconduct may
            result in immediate termination of your session.
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                color="primary"
              />
            }
            label="I have read and understood the examination instructions and agree to comply with all examination rules."
          />
        </div>

        <div className="card-footer d-flex justify-content-between">
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="success"
            disabled={!accepted}
          >
            Start Examination
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;
