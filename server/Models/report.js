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
    vulnerabilityType:{
      type:String,
    },
    title: {
      type: String,
      required: true,
    },
    severty: {
      type: String,
      required: true,
    },
    POC:{
      type: String,
      required:true,
    },
    
    summary: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: String,
        required: true,
      },
    ],
    vulnerabilityImpact:{
      type:String,
      required:true,
    },
    ip:{
      type:String,
    },
    testingEmail:{
      type:String,
    },
    bountyReward: {
      type: Number,
    },
    status:{
      type:String,
      enum:["completed","rejected","underreview","draft","triage"],
      default:"draft"
    },
    tags:{
      type:[String],
    }
  },
  { timestamps: true }
)

export default mongoose.model('report', reportScheema)
