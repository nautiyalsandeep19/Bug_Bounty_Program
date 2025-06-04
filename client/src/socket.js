// src/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("http://localhost:8000", {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};
