import Program from '../Models/Program.js'

export const createInitialProgram = async (req, res) => {
  try {
    const { title, type, company } = req.body
    console.log(`${title} ${type} ${company}`)

    if (!title || !type || !company) {
      return res
        .status(400)
        .json({ message: 'Title, type, and company are required' })
    }

    const program = new Program({ title, type, company })
    const saved = await program.save()

    return res
      .status(201)
      .json({ message: 'Initial program created', programId: saved._id })
  } catch (error) {
    console.error('Error creating initial program:', error)
    return res
      .status(500)
      .json({ message: 'Server error while creating program' })
  }
}

// export const updateProgram = async (req, res) => {
//   try {
//     const programId = req.params.id;
//     const updates = req.body;

//     const updatedProgram = await Program.findByIdAndUpdate(programId, updates, {
//       new: true,
//     });

//     if (!updatedProgram) {
//       return res.status(404).json({ message: "Program not found" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Program updated", program: updatedProgram });
//   } catch (error) {
//     console.error("Error updating program:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while updating program" });
//   }
// };

export const fetchAllPrograms = async (req, res) => {
  try {
    const publicPrograms = await Program.find({
      visibility: 'public',
    }).populate('company')

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

export const fetchPrivateProgramsForHacker = async (req, res) => {
  try {
    if (!req.user && req.user.userType !== 'hacker') {
      // made changes &&
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

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs,
    })
  } catch (error) {
    console.error('Error fetching private programs for hacker:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching private programs',
    })
  }
}

export const createProgram = async (req, res) => {
  try {
    const { type, title, company } = req.body

    if (!type || !title || !company) {
      return res.status(400).json({ message: 'Type and title are required' })
    }

    const newProgram = new Program({ type, title, company })
    await newProgram.save()

    return res
      .status(201)
      .json({ message: 'Program created', data: newProgram })
  } catch (err) {
    console.error('Create Program Error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateProgramById = async (req, res) => {
  try {
    // Helper function to safely parse JSON
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
      title: req.body.programName,
      guidelines: req.body.guidelines,
      concerns: req.body.concerns,
      policy: req.body.policy,
      additionalDetails: req.body.additionalDetails,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      scope: safeParse(req.body.scope),
      brand: safeParse(req.body.brand),
    }

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
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

// Controller
export const getProgramssByCompany = async (req, res) => {
  try {
    console.log('debugging')
    const { companyId } = req.params

    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' })
    }

    const programs = await Program.find({ company: companyId })
      .populate('company')
      .populate('invitedHackers')
    // .populate('scope')

    res.status(200).json({
      message: 'Programs fetched successfully',
      data: programs,
    })
  } catch (err) {
    console.error('Error fetching programs:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
