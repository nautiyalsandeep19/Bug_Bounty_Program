import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  visibility: { type: String, enum: ["private", "public"], default: "public" },
  bountyRange: {
    informational: { type: Number, default: 0 },
    low: { type: Number, default: 50 },
    medium: { type: Number, default: 400 },
    high: { type: Number, default: 800 },
    critical: { type: Number, default: 1000 },
  },
  invitedHackers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hacker" }],
  assets: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: "Asset" }],
   type: programData.type, // ✅ use lowercase "type" to match schema
  startDate: { type: Date, default: Date.now },
  endDate: {
    type: Date,
    default: function () {
      const twoMonthsLater = new Date();
      twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
      return twoMonthsLater;
    },
  },
}, { timestamps: true });

export default mongoose.model("Program", programSchema);