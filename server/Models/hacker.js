import mongoose from "mongoose";

const hackerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    //   match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
  },
  { timestamps: true }
);

const Hacker = mongoose.model("Hacker", hackerSchema);
export default Hacker;
