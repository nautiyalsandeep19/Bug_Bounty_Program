import React, { useEffect, useState } from "react";
import { getSocket } from "../../socket";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatRoom = () => {
  const { reportId } = useParams(); // ✅ correctly extract reportId
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


    // ✅ Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/messages/${reportId}`, {
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


  useEffect(() => {
    const socket = getSocket();
    if (!socket || !reportId) return;

    // ✅ Join the specific room
    socket.emit("joinRoom", reportId);

    // ✅ Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // ✅ Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [reportId]);

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
      setInput("");
      toast.success("Message sent successfully!");
    }
  };

  return (
    <div>
      <h2 className="text-amber-300">Chat for Report: {reportId}</h2>

      <div style={{ padding: "1rem", background: "#f7f7f7" }}>
        {messages.map((msg, index) => (
          <p key={index} className="text-black">
            <strong>{msg.senderModel}: </strong> {msg.message}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write message..."
        style={{ marginRight: "0.5rem" }}
        className="p-2 border rounded"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
