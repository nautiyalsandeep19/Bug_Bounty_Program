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
    title: {
      type: String,
      required: true,
    },
    severty: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: String,
        required: true,
      },
    ],

    bountyReward: {
      type: Number,
    },
  },
  { timestamps: true }
)

export default mongoose.model('report', reportScheema)
