import mongoose from 'mongoose'

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
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    image: {
      type: String,
    },
    skills: {
      type: [String],
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },

  { timestamps: true }
)

const Hacker = mongoose.model('Hacker', hackerSchema)
export default Hacker
