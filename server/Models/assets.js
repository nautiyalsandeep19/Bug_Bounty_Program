import mongoose from 'mongoose'

const assetsSchema = new mongoose.Schema(
  {
    assetURL: {
      type: String,
      required: true,
    },
    assetDescription: {
      type: String,
    },
    assetType: {
      type: String,
      enum: [
        'API',
        'Mobile-Android',
        'Mobile-IOS',
        'Hardware',
        'Website',
        'Others',
      ],
    },
    labels: {
      type: String,
      enum: [
        'Production',
        'Development',
        'Staging',
        'Testing',
        'QA',
        'UAT',
        'Sandbox',
        'DevOps',
      ],
    },
    scope: {
      type: String,
      enum: ['InScope', 'OutScope'],
    },
  },
  { timestamps: true }
)

const Asset = mongoose.model('Asset', assetsSchema)
export default Asset
