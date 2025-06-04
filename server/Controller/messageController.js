// controllers/messageController.js
import Message from '../Models/message.js';

export const getMessagesForReport = async (req, res) => {
  const { reportId } = req.params;
  try {
    const messages = await Message.find({ reportId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
};
