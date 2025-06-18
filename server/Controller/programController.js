import Program from '../Models/Program.js'
import Report from '../Models/Report.js'
import mongoose from 'mongoose'

export const createProgram = async (req, res) => {
  try {
    const { type, title, company, visibility } = req.body

    const program = new Program({
      type,
      title: title || 'New Program',
      company,
      visibility,
      status: 'draft', // Always create as draft initially
    })

    await program.save()
    res.status(201).json({ data: program })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateProgramById = async (req, res) => {
  try {
    const safeParse = (value) => {
      if (!value || value === 'null') return null
      try {
        return typeof value === 'string' ? JSON.parse(value) : value
      } catch (e) {
        console.warn(`Failed to parse value:`, value)
        return null
      }
    }

    const updateData = {
      title: req.body.title,
      guidelines: req.body.guidelines,
      areasOfConcern: req.body.concerns,
      policy: req.body.policy,
      additionalDetails: req.body.additionalDetails,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      assets: safeParse(req.body.scope),
      brand: req.body.brand,
      bountyRange: req.body.bountyRange || {
        low: 0,
        medium: 0,
        high: 0,
      },
      visibility: req.body.visibility || 'public',
      status: req.body.status || 'draft', // Add status field
    }

    const programId = req.params.id
    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      updateData,
      { new: true }
    )

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }

    res.status(200).json({ message: 'Program updated', data: updatedProgram })
  } catch (error) {
    console.error('Update error:', error)
    res.status(500).json({
      message: 'Update failed',
      error: error.message,
      receivedData: req.body,
    })
  }
}

// export const getProgramsByCompany = async (req, res) => {
//   try {
//     const { companyId } = req.params

//     if (!companyId) {
//       return res.status(400).json({ message: 'Company ID is required' })
//     }

//     const programs = await Program.find({ company: companyId })
//       .populate('company')
//       .populate('invitedHackers')
//     // .populate("scope");

//     res.status(200).json({
//       message: 'Programs fetched successfully',
//       data: programs, // Note: sending direct array, not wrapped in data property
//     })
//   } catch (err) {
//     console.error('Error fetching programs:', err)
//     res.status(500).json({ message: 'Server error' })
//   }
// }
export const getProgramsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params
    const { status } = req.query // Get status from query params

    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' })
    }

    const query = { company: companyId }

    // If status is provided, filter by status
    if (status) {
      query.status = status
    } else {
      // Default to only showing published programs if no status specified
      query.status = 'published'
    }

    const programs = await Program.find(query)
      .populate('company')
      .populate('invitedHackers')

    res.status(200).json({
      message: 'Programs fetched successfully',
      data: programs,
    })
  } catch (err) {
    console.error('Error fetching programs:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getProgramByIds = async (req, res) => {
  try {
    const { programId } = req.body
    console.log('ID dd', programId)

    const programData = await Program.findById(programId)
      .populate('assets')
      .populate('company')
      .populate({
        path: 'leaderboard.hacker',
        select: 'username name image', // Only get these fields
      })

    if (!programData) {
      return res.status(404).json({ message: 'Program not found' })
    }

    const reportCount = await Report.find({ programId })

    const program = programData.toObject()
    program.reportCount = reportCount.length
    res.status(200).json({
      message: 'Program fetched successfully',
      data: program,
    })
  } catch (error) {
    console.error('Fetch Program Error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const fetchPrivateProgramsForHacker = async (req, res) => {
  try {
    console.log('requser', req.user)

    if (!req.user && req.user.userType !== 'hacker') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only hackers can access private programs.',
      })
    }

    const hackerId = req.user.id

    const programs = await Program.find({
      visibility: 'private',
      invitedHackers: hackerId,
    })
    console.log('pro', programs)

    return res.status(200).json({
      success: true,
      programs,
      count: programs.length,
    })
  } catch (error) {
    console.error('Error fetching private programs for hacker:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching private programs',
    })
  }
}

// export const fetchAllPrograms = async (req, res) => {
//   try {
//     const publicPrograms = await Program.find({ visibility: 'public' })
//       .sort({ createdAt: -1 })
//       .populate('company')

//     res.status(200).json({
//       success: true,
//       count: publicPrograms.length,
//       programs: publicPrograms,
//     })
//   } catch (error) {
//     console.error('Error fetching public programs:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching programs',
//     })
//   }
// }
export const fetchAllPrograms = async (req, res) => {
  try {
    const publicPrograms = await Program.find({
      visibility: 'public',
      status: 'published', // Only show published programs
    })
      .sort({ createdAt: -1 })
      .populate('company')

    res.status(200).json({
      success: true,
      count: publicPrograms.length,
      programs: publicPrograms,
    })
  } catch (error) {
    console.error('Error fetching public programs:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching programs',
    })
  }
}

export const updateProgramVisibility = async (req, res) => {
  try {
    const { visibility } = req.body
    const programId = req.params.id

    // Validate visibility input
    if (!['public', 'private'].includes(visibility)) {
      return res
        .status(400)
        .json({ message: "Visibility must be either 'public' or 'private'" })
    }

    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      { visibility },
      { new: true }
    )

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }

    res.status(200).json({
      message: `Program visibility updated to ${visibility}`,
      data: updatedProgram,
    })
  } catch (error) {
    console.error('Visibility update error:', error)
    res.status(500).json({
      message: 'Failed to update program visibility',
      error: error.message,
    })
  }
}


// controller/programController.js
export const toggleLeaderboardVisibility = async (req, res) => {
  const { programId } = req.body;

  try {
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    program.leaderboardVisibility = !program.leaderboardVisibility;
    await program.save();

    return res.status(200).json({
      success: true,
      message: "Leaderboard visibility toggled",
      updatedProgram: program,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
export const publishProgram = async (req, res) => {
  try {
    const programId = req.params.id

    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      { status: 'published' },
      { new: true }
    )

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' })
    }

    res.status(200).json({
      message: 'Program published successfully',
      data: updatedProgram,
    })
  } catch (error) {
    console.error('Publish program error:', error)
    res.status(500).json({
      message: 'Failed to publish program',
      error: error.message,
    })
  }
}
