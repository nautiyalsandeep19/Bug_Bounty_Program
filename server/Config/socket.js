import express from "express";
import http from "http";
import { Server } from "socket.io";
import  Message  from "../Models/message.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  // console.log("query: ",socket.handshake.query.userId);

  console.log("userId from backend: ", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Join room function
  socket.on("joinRoom", (reportId) => {
    socket.join(reportId);
    console.log(`Socket ${socket.id} joined room ${reportId}`);
  });

  // Send Message function
  socket.on(
    "sendMessage",
    async ({ reportId, senderId, senderModel, message }) => {
      try {
        const newMsg = new Message({
          reportId,
          senderId,
          senderModel,
          message,
        });
        await newMsg.save();

        io.to(reportId).emit("receiveMessage", newMsg);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected backend:", socket.id);
    delete userSocketMap[userId];
  });
});

export { app, server, io };
