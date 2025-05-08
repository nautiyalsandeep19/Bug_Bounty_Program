import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  country: { type: String },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  programs: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
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
})

const Company = mongoose.model('Company', companySchema)
export default Company
