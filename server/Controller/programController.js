import Program from '../Models/Program.js'
import Report from '../Models/Report.js'
import Hacker from '../Models/Hacker.js'
import nodemailer from 'nodemailer'

export const createProgram = async (req, res) => {
  try {
    const { type, title, company, description, visibility } = req.body

    const program = new Program({
      type,
      title: title || 'New Program',
      company,
      visibility,
      status: 'draft',
      description,
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
      description: req.body.description,
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
      status: req.body.status || 'draft',
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
    // First, fetch the program without leaderboard population
    const programData = await Program.findById(programId)
      .populate('assets')
      .populate('company', 'domain image')

    if (!programData) {
      return res.status(404).json({ message: 'Program not found' })
    }

    // Convert to plain object to allow editing
    const program = programData.toObject()

    // If leaderboard visibility is true, manually populate leaderboard
    if (programData.leaderboardVisibility) {
      await Program.populate(program, {
        path: 'leaderboard.hacker',
        select: 'username name image',
      })
    } else {
      // If not visible, clear the leaderboard
      program.leaderboard = []
    }

    // Add report count
    const reportCount = await Report.countDocuments({ programId })
    program.reportCount = reportCount

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
    console.log('requsert', req.user)

    if (!req.user && req.user.userType !== 'hacker') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only hackers can access private programs.',
      })
    }

    const hackerId = req.user.id

    const programs = await Program.find({
      status: 'published',
      visibility: 'private',
      invitedHackers: hackerId,
    }).populate('company')
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

export const fetchAllPrograms = async (req, res) => {
  try {
    const publicPrograms = await Program.find({
      visibility: 'public',
      status: 'published',
    })
      .sort({ createdAt: -1 })
      .populate('company', 'domain image name invitedHackers')

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
  const { programId } = req.body

  try {
    const program = await Program.findById(programId)
    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: 'Program not found' })
    }

    program.leaderboardVisibility = !program.leaderboardVisibility
    await program.save()

    return res.status(200).json({
      success: true,
      message: 'Leaderboard visibility toggled',
      updatedProgram: program,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error })
  }
}

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

export const programInvite = async (req, res) => {
  try {
    const { programId } = req.params
    const { hackerIds } = req.body

    // 1. Update program with invited hackers
    await Program.findByIdAndUpdate(programId, {
      $addToSet: { invitedHackers: { $each: hackerIds } },
    })

    // 2. Get program and hacker details
    const [program, hackers] = await Promise.all([
      Program.findById(programId).select('title'),
      Hacker.find({ _id: { $in: hackerIds } }).select('email name'),
    ])

    if (!program || !hackers.length) {
      return res.status(404).json({
        success: false,
        message: !program ? 'Program not found' : 'No hackers found',
      })
    }

    // 3. Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    })

    // 4. Send emails
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:8000'
    const programUrl = `${baseUrl}/programs/${programId}`

    const results = await Promise.allSettled(
      hackers.map((hacker) =>
        transporter.sendMail({
          from: `"Bug Bounty Platform" <${process.env.EMAIL_USERNAME}>`,
          to: hacker.email,
          subject: `Invitation: ${program.title}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">You've Been Invited!</h2>
            <p>Dear ${hacker.name},</p>
            <p>You have been invited to participate in a private bug bounty program:</p>
            
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">${program.title}</h3>
              <p>This is an exclusive invitation-only program.</p>
            </div>
            
            <p>Click the button below to access the program:</p>
            <a href="${programUrl}" 
               style="display: inline-block; background-color: #2563eb; color: white; 
                      padding: 12px 24px; text-decoration: none; border-radius: 4px; 
                      font-weight: bold; margin: 16px 0;">
              Access Program
            </a>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all;">${programUrl}</p>
            
            <p>Happy hacking!</p>
            <p>The Bug Bounty Platform Team</p>
          </div>
        `,
        })
      )
    )

    // Check for failures
    const failedEmails = results
      .filter((r) => r.status === 'rejected')
      .map((r, i) => ({ email: hackers[i].email, error: r.reason.message }))

    if (failedEmails.length) {
      console.error('Failed emails:', failedEmails)
    }

    res.status(200).json({
      success: true,
      message: `Invites sent with ${failedEmails.length} failures`,
      failedEmails,
    })
  } catch (err) {
    console.error('Invite error:', err)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    })
  }
}
