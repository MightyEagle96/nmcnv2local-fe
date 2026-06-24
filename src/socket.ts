import { io } from "socket.io-client";

const url = import.meta.env.PROD
  ? "/"
  : `${window.location.origin.replace("5173", "4001")}`;

console.log("Socket URL:", url);

export const socket = io(url);

socket.on("connect", () => {
  console.log("Global socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Global socket error:", err);
});
