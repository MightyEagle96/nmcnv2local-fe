import { useEffect } from "react";
import { toastError } from "../../../components/ErrorToast";
import { httpService } from "../../../httpService";

function MonitorExam() {
  const getActiveSession = async () => {
    try {
      const { data } = await httpService.get("examination/activesession");
      console.log(data);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getActiveSession();
  }, []);
  return <div>MonitorExam</div>;
}

export default MonitorExam;
