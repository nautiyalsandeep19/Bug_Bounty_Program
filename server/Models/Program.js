import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      required: true,
      default: "public",
    },
    bountyRange: {
      informational: { type: Number, required: true, default: 0 },
      low: { type: Number, required: true, default: 50 },
      medium: { type: Number, required: true, default: 400 },
      high: { type: Number, required: true, default: 800 },
      critical: { type: Number, required: true, default: 1000 },
    },
    invitedHackers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hacker",
      },
    ],
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Asset",
      },
    ],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: function () {
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
        return twoMonthsLater;
      },
    },
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);
export default Program;
