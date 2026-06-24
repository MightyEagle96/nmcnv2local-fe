import { useEffect, useState } from "react";
import DisconnectPage from "../common/DisconnectPage";
import { socket } from "../../socket";
import SideMenuBar from "../../components/SideMenuBar";

function CandidateExamPage() {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to server");
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log("Disconnected from server");
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (!connected) {
    return <DisconnectPage reconnect={() => socket.connect()} />;
  }

  return (
    <div>
      <div className="row m-0">
        <div className="col-lg-10">hello</div>
        <div className="col-lg-2 border-start">
          <SideMenuBar />
        </div>
      </div>
    </div>
  );
}

export default CandidateExamPage;
