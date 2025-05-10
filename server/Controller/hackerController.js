import Hacker from '../Models/hacker.js'

export const getHackerDetails = async (req, res) => {
  try {
    // get user id from the req
    console.log(req.user)
    const userId = req.user.id

    // validate user id
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    // get all details
    const hackerDetails = await Hacker.findById(userId)

    //   validate HackerDetails
    if (!hackerDetails) {
      return res.status(400).json({
        success: true,
        message: 'Hacker Details Not Found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Data Fetched',
      hackerDetails,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while getting Programs Data',
    })
  }
}

export const updateHackerPerson = async (req, res) => {
  try {
    const userId = req.user.id

    const {
      phone = '',
      bio = '',
      website = '',
      companywebsite = '',
      linkedin = '',
      instagram = '',
      github = '',
      twitter = '',
    } = req.body

    // Directly update the two nested objects
    const updatedHacker = await Hacker.findByIdAndUpdate(
      userId,
      {
        phone,
        basicDetails: {
          bio,
          website,
          companywebsite,
        },
        socialLinks: {
          linkedin,
          instagram,
          github,
          twitter,
        },
      },
      { new: true } // Return updated document
    )

    if (!updatedHacker) {
      return res.status(404).json({
        success: false,
        message: 'Hacker not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Hacker person updated successfully',
      Hacker: updatedHacker,
    })
  } catch (error) {
    console.error('Error updating Hacker person:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while updating Hacker person',
    })
  }
}
