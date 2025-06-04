import mongoose from 'mongoose'

const reportScheema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'program',
    },
    hackerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hacker',
    },

    submitDate: {
      type: Date,
      default: Date.now,
    },
    scope: {
      type: String,
      required: true,
    },
    vulnerableEndpoint: {
      type: String,
    },
    vulnerabilityType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    POC: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: Array,
      },
    ],
    vulnerabilityImpact: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
    testingEmail: {
      type: String,
    },
    bountyReward: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        'completed',
        'rejected',
        'underreview',
        'draft',
        'triage',
        'submitted',
      ],
      default: 'draft',
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
)

export default mongoose.model('report', reportScheema)
