// import mongoose from 'mongoose'
// import Program from './Program.js'

// const reportSchema = new mongoose.Schema(
//   {
//     programId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Program',
//     },
//     hackerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Hacker',
//     },
//     submitDate: {
//       type: Date,
//       default: Date.now,
//     },
//     scope: {
//       type: String,
//       required: true,
//     },
//     vulnerableEndpoint: {
//       type: String,
//     },
//     vulnerabilityType: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     severity: {
//       type: String,
//       required: true,
//     },
//     POC: {
//       type: String,
//       required: true,
//     },
//     summary: {
//       type: String,
//       required: true,
//     },
//     attachments: [
//       {
//         type: Array,
//       },
//     ],
//     vulnerabilityImpact: {
//       type: String,
//       required: true,
//     },
//     ip: {
//       type: String,
//     },
//     testingEmail: {
//       type: String,
//     },
//     bountyReward: {
//       type: Number,
//     },
//     status: {
//       type: String,
//       enum: [
//         'completed',
//         'rejected',
//         'underreview',
//         'draft',
//         'triage',
//         'submitted',
//         'spam',
//       ],
//       default: 'draft',
//     },
//     tags: {
//       type: [String],
//     },
//   },
//   { timestamps: true }
// )

// // POST middleware to update Program after a report is created
// reportSchema.post('save', async function (doc, next) {
//   try {
//     if (doc.status !== 'draft') {
//       await Program.findByIdAndUpdate(doc.programId, {
//         $push: { reports: doc._id },
//       })

//       const uniqueHackers = await mongoose
//         .model('Report')
//         .distinct('hackerId', {
//           programId: doc.programId,
//         })

//       await Program.findByIdAndUpdate(doc.programId, {
//         $set: { participants: uniqueHackers.length },
//       })
//     }

//     next()
//   } catch (error) {
//     console.error(
//       'Error updating Program participants after report save:',
//       error
//     )
//     next(error)
//   }
// })

// const Report = mongoose.model('Report', reportSchema)
// export default Report

import mongoose from 'mongoose'
import Program from './program.js'

const reportSchema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    hackerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hacker',
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
        'spam',
      ],
      default: 'draft',
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
)

// POST middleware to update Program after a report is created
reportSchema.post('save', async function (doc, next) {
  try {
    if (doc.status !== 'draft') {
      await Program.findByIdAndUpdate(doc.programId, {
        $push: { reports: doc._id },
      })

      const uniqueHackers = await mongoose
        .model('Report')
        .distinct('hackerId', {
          programId: doc.programId,
        })

      await Program.findByIdAndUpdate(doc.programId, {
        $set: { participants: uniqueHackers.length },
      })
    }

    next()
  } catch (error) {
    console.error(
      'Error updating Program participants after report save:',
      error
    )
    next(error)
  }
})

const Report = mongoose.model('Report', reportSchema)
export default Report
