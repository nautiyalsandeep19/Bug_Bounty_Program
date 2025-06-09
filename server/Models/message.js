import mongoose from 'mongoose'


const messageSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      enum: ["Hacker", "Company", "Triager"],
      required: true,
    },
    message: { type: String, required: true },
    messageType:{ type:String , enum: ['text','log']},
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
