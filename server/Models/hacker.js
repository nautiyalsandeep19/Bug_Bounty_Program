import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

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
    country: String,
    image: String,
    skills: [String],
    phone: {
      type: Number,
      match: /^[0-9]{10}$/,
      message: 'Phone number must be exactly 10 digits',
    },
    username: {
      type: String,
      unique: true,
    },
    basicDetails: {
      bio: String,
      website: String,
      companyname: String,
    },
    socialLinks: {
      linkedin: String,
      instagram: String,
      github: String,
      twitter: String,
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
      },
    ],
    KYCstatus: {
      type: Boolean,
      default: false,
    },
    KYC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KYC',
    },
    token: String,
    resetPasswordExpires: Date,
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

// Pre-save middleware to assign unique username if not provided

hackerSchema.pre('save', async function (next) {
  if (!this.username) {
    let unique = false
    while (!unique) {
      const generated = `${this.name.trim().split(' ')[0]}-${nanoid(5)}`
      const existing = await mongoose.models.Hacker.findOne({
        username: generated,
      })

      if (!existing) {
        this.username = generated
        unique = true
      }
    }
  }
  next()
})

const Hacker = mongoose.models.Hacker || mongoose.model('Hacker', hackerSchema)
export default Hacker
