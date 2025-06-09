import Program from '../Models/Program.js'
import Company from '../Models/company.js'
// get companys all programs
export const getCompnayPrograms = async (req, res) => {
  try {
    const companyId = req.user.id

    // validate the id
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Request id not found',
      })
    }

    // find programs
    const programs = await Program.find({ company: companyId })

    // validate programs
    if (!programs) {
      return res.status(400).json({
        success: false,
        message: 'No programs found!',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Fetched Programs for the company',
      programs,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while getting Programs Data',
    })
  }
}

//get company details
export const getCompanyDetails = async (req, res) => {
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
    const companyDetails = await Company.findById(userId)
      .populate('programs')
      .populate('invitedHackers')

    //   validate companyDetails
    if (!companyDetails) {
      return res.status(400).json({
        success: true,
        message: 'Company Details Not Found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Data Fetched',
      companyDetails,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while getting Programs Data',
    })
  }
}



export const updateContactPerson = async (req, res) => {
  try {
    const userId = req.user.id // assuming authentication middleware sets req.user

    const {
      representative = ' ',
      position = ' ',
      phone = ' ',
      domain = ' ',
    } = req.body

    // Update the company document with the new contact person and domain
    const updatedCompany = await Company.findByIdAndUpdate(
      userId, // using the userId to find the company
      {
        contactPerson: {
          representative,
          position,
          phone,
        },
        domain, // update domain
      },
      { new: true } // return the updated document
    )


    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      })
    }

    // Return the updated company information in the response
    return res.status(200).json({
      success: true,
      message: 'Contact person updated successfully',
      company: updatedCompany, // return updated company data
    })
  } catch (error) {
    console.error('Error updating contact person:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while updating contact person',
    })
  }
}


export const getAllCompany = async( req , res ) =>{
 try {
    const allCompany = await Company.find() // populate KYC details if needed

    res.status(200).json({
      success: true,
      count: allCompany.length,
      companies: allCompany,
    })
  } catch (error) {
    console.error('Error fetching all companies:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching companies',
    })
  }
}