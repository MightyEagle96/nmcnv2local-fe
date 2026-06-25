import { useEffect, useState } from "react";
import DisconnectPage from "../common/DisconnectPage";
import { socket } from "../../socket";
import SideMenuBar from "../../components/SideMenuBar";

import { useAppUser } from "../../context/AppUserContext";
import { toastError } from "../../components/ErrorToast";
import { httpService } from "../../httpService";
import QuestionsDisplay from "./QuestionsDisplay";

function CandidateExamPage() {
  const [connected, setConnected] = useState(socket.connected);
  const { user } = useAppUser();

  useEffect(() => {
    if (socket.connected && user?._id) {
      socket.emit("join-exam", {
        candidateId: user._id,
      });
    }

    const onConnect = () => {
      socket.emit("join-exam", {
        candidateId: user?._id,
      });
      setConnected(true);
    };

    socket.on("connect", onConnect);

    const onDisconnect = () => {
      console.log("Disconnected from server");
      setConnected(false);
    };

    const onTest = async () => {
      try {
        const { data } = await httpService("examination/clearcookie");
        if (data) {
          window.location.assign("/");
        }
      } catch (error) {
        toastError(error);
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("test", onTest);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("test", onTest);
    };
  }, []);

  if (!connected) {
    return <DisconnectPage reconnect={() => socket.connect()} />;
  }

  return (
    <div>
      <div className="row m-0">
        <div className="col-lg-10 p-3">
          <QuestionsDisplay />
        </div>
        <div
          style={{ minHeight: "100vh", overflowY: "scroll" }}
          className="col-lg-2 bg-light"
        >
          <SideMenuBar />
        </div>
      </div>
    </div>
  );
}

export default CandidateExamPage;
