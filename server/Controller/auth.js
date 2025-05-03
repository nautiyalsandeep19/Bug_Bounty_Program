import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "User can't be registered",
    })
  }
}

export default signUp
