import Hacker from '../Models/hacker.js'

export const getHackerDetails = async (req, res) => {
  try {
    // get user id from the req
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
        success: false,
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
      companyname = '',
      linkedin = '',
      instagram = '',
      github = '',
      twitter = '',
    } = req.body

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits',
      })
    }
    // Directly update the two nested objects
    const updatedHacker = await Hacker.findByIdAndUpdate(
      userId,
      {
        phone,
        basicDetails: {
          bio,
          website,
          companyname,
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



export const getLeaderboard = async (req, res) => {
  try {
    const leaderBoard = await Hacker.aggregate([
      {
        $sort: { totalPoints: -1 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          image: 1,
          totalPoints: 1
        }
      }
    ]);

    res.status(200).json({success:true,message:"Leader Board Data Fetched",leaderBoard});
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ success:false,message: 'Server error' });
  }
};


export const getAllHackersDetails = async (req, res) => {
  try {
    const allHackers = await Hacker.find().populate('KYC') // populate KYC details if needed

    res.status(200).json({
      success: true,
      count: allHackers.length,
      hackers: allHackers,
    })
  } catch (error) {
    console.error('Error fetching all hackers:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hackers',
    })
  }
}
