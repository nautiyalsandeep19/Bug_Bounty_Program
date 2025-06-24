import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
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
    token: String,
    resetPasswordExpires: Date,
    userType: {
      type: String,
      required: true,
      enum: ['admin', 'triager'],
    },
    bio: {
      type: String,
    },
    github: {
      type: String,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)
export default Admin
