import Admin from '../Models/admin.js'

export const updateTriager = async (req, res) => {
  try {
    const userId = req.user.id

    // Get user first to validate userType
    const user = await Admin.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    if (user.userType !== 'triager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. Only triager accounts can update this setting.',
      })
    }

    const { bio = '', github = '', image = '', phone = '' } = req.body

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits',
      })
    }

    const updatedTriager = await Admin.findByIdAndUpdate(
      userId,
      { bio, github, phone, image },
      { new: true }
    )

    return res.status(200).json({
      success: true,
      message: 'Triager updated successfully',
      triager: updatedTriager,
    })
  } catch (error) {
    console.error('Error updating triager:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while updating triager',
    })
  }
}

export default updateTriager
