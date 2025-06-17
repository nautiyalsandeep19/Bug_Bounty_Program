import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domain: { type: String, required: true },
    country: { type: String },
    username: {
      type: String,
      unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    description: { type: String },
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    invitedHackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hacker' }],
    contactPerson: {
      representative: { type: String },
      position: { type: String },
      phone: { type: String },
    },
    image: { type: String },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
)

companySchema.pre('save', async function (next) {
  if (!this.username) {
    let unique = false
    while (!unique) {
      const generatedUsername = `${this.name.trim().split(' ')[0]}-${nanoid(5)}`
      const existing = await mongoose.models.Company.findOne({
        username: generatedUsername,
      })
      if (!existing) {
        this.username = generatedUsername
        unique = true
      }
    }
  }
  next()
})

const Company = mongoose.model('Company', companySchema)
export default Company
