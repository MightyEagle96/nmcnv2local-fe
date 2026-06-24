import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toastError } from "../../components/ErrorToast";
import { httpService } from "../../httpService";

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

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Examination Instructions</h3>
        </div>

        <div className="card-body">
          <div className="alert alert-warning">
            <strong>Important:</strong> Please read all instructions carefully
            before proceeding.
          </div>

          <h5>General Information</h5>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "30%" }}>Examination</th>
                <td>{summary?.examination.name}</td>
              </tr>

              <tr>
                <th>Duration</th>
                <td>{summary?.duration} Minutes</td>
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

          <div className="alert alert-danger mt-4">
            <strong>Warning:</strong> Multiple login attempts, impersonation,
            unauthorized access, or any form of examination misconduct may
            result in immediate termination of your session.
          </div>

          <div className="form-check mt-4">
            <input
              id="acceptInstructions"
              type="checkbox"
              className="form-check-input"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />

            <label htmlFor="acceptInstructions" className="form-check-label">
              I have read and understood the examination instructions and agree
              to comply with all examination rules.
            </label>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <Link to="/cbt/dashboard" className="btn btn-outline-secondary">
            Back
          </Link>

          <button className="btn btn-success" disabled={!accepted}>
            Start Examination
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;
