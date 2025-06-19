import mongoose from 'mongoose'

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // description: { type: String, default: "" },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    brand: {
      programName: { type: String, default: '' },
      programTagline: { type: String, default: '' },
      programWebsite: { type: String, default: '' },
      programDescription: { type: String, default: '' },
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    policy: { type: String, default: '' },
    additionalDetails: { type: String, default: '' },
    visibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'public',
    },
    bountyRange: {
      low: { type: Number, default: 50 },
      medium: { type: Number, default: 400 },
      high: { type: Number, default: 800 },
    },
    invitedHackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hacker' }],
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
    type: {
      type: String,
      enum: [
        'VDP',
        'Private Bug Bounty',
        'Public Bug Bounty',
        'Enterprise Pentesting',
      ],
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: {
      type: Date,
      default: function () {
        const twoMonthsLater = new Date()
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2)
        return twoMonthsLater
      },
    },
    guidelines: { type: String },
    areasOfConcern: { type: String },
    logo: { type: String },
    isPublished: { type: Boolean, default: false },
    leaderboard: [
      {
        hacker: { type: mongoose.Schema.Types.ObjectId, ref: 'Hacker' },
        score: { type: Number, default: 0 },
      },
    ],
    leaderboardVisibility: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Program = mongoose.model('Program', programSchema)

export default Program
