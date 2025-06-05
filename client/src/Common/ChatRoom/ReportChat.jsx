import React, { useEffect, useState } from "react";
import { getSocket } from "../../socket";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatRoom = () => {
  const { reportId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL || "http://localhost:8000";

  // ✅ Fetch all previous messages (already populated with senderInfo)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/messages/${reportId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setMessages(res.data.messages);
        } else {
          toast.error("Failed to load messages");
        }
      } catch (err) {
        console.error("Message fetch error:", err);
        toast.error("Error loading messages");
      }
    };

    if (reportId) {
      fetchMessages();
    }
  }, [reportId]);

  // ✅ Listen for new socket messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !reportId) return;

    socket.emit("joinRoom", reportId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [reportId]);

  // ✅ Send message via socket
  const sendMessage = () => {
    const socket = getSocket();
    const user = JSON.parse(localStorage.getItem("user"));
    const userType = JSON.parse(localStorage.getItem("userType"));

    if (socket && input.trim()) {
      socket.emit("sendMessage", {
        reportId,
        senderId: user._id,
        senderModel: userType.charAt(0).toUpperCase() + userType.slice(1),
        message: input,
      });
      setInput(""); // Clear input
    }
  };

  return (
    <div>
      <h2 className="text-amber-300 mb-4">Chat for Report: {reportId}</h2>

      <div style={{ padding: "1rem", background: "#f7f7f7", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => {
          const senderName =
            msg.senderModel === "Hacker"
              ? msg.senderInfo?.username
              : msg.senderInfo?.name;

          return (
            <p key={index} className="text-black mb-2">
              <strong>{senderName || "Unknown"}:</strong> {msg.message}
            </p>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write message..."
          className="p-2 border rounded w-full"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;


