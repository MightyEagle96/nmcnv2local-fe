import { useEffect, useState } from "react";
import DisconnectPage from "../common/DisconnectPage";
import { socket } from "../../socket";

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

  return <div>CandidateExamPage</div>;
}

export default CandidateExamPage;
