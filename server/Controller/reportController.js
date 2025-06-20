import Admin from '../Models/admin.js'
import Message from '../Models/Message.js'
import Program from '../Models/Program.js'
import Report from '../Models/Report.js'
import {
  updateGlobalLeaderBoard,
  updateProgramLeaderBoard,
} from '../Utils/leaderBoard.js'

export const createReport = async (req, res) => {
  try {
    const hackerId = req.user.id
    const { programId, reportData } = req.body
    if (!programId || !reportData) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' })
    }
    const {
      scope,
      vulnerableEndpoint,
      vulnerabilityType,
      title,
      severity,
      POC,
      summary,
      attachments,
      vulnerabilityImpact,
      testingEmail,
      status = 'draft',
      submitDate = new Date(),
    } = reportData
    if (
      !scope ||
      !vulnerabilityType ||
      !title ||
      !severity ||
      !POC ||
      !summary ||
      !vulnerabilityImpact
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields in reportData are required',
      })
    }
    const report = {
      hackerId,
      programId,
      scope,
      vulnerableEndpoint,
      vulnerabilityType,
      title,
      severity,
      POC,
      summary,
      attachments: attachments || [],
      vulnerabilityImpact,
      testingEmail,
      status,
      submitDate,
    }
    const newReport = await Report.create(report)
    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      report: newReport,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message })
  }
}

// export const updateStatus = async (req, res) => {
//   try {
//     const { reportId } = req.params
//     const { status } = req.body
//     const userType = req.user.userType
//     console.log('report', userType)

//     if (userType !== 'triager') {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized',
//       })
//     }

//     if (!reportId || !status) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report ID and status are required',
//       })
//     }

//     const existingReport = await Report.findById(reportId)

//     if (!existingReport) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found',
//       })
//     }

//     if (existingReport.status === status) {
//       return res.status(200).json({
//         success: false,
//         message: `Status is already "${status}"`,
//       })
//     }

//     // Update status
//     existingReport.status = status
//     await existingReport.save()

//     const hackerId = existingReport.hackerId
//     const programId = existingReport.programId
//     console.log('Hacker Id: ', hackerId)

//     const statusPointsMap = {
//       spam: -5,
//       duplicated: -5,
//       triage: 5,
//       completed: 10,
//     }

//     // Check if status is valid and apply points
//     if (status in statusPointsMap) {
//       updateGlobalLeaderBoard(hackerId, statusPointsMap[status])
//       updateProgramLeaderBoard(programId, hackerId, statusPointsMap[status])
//     }

//     // Generate custom log text
//     let logText = ''
//     const userName = req.user?.name || 'triager'

//     switch (status.toLowerCase()) {
//       case 'spam':
//         logText = `Report was marked as <b>Spam</b> by ${userName}`
//         break
//       case 'completed':
//         logText = `Report was <b>marked as Completed</b> by ${userName}`
//         break
//       case 'in progress':
//         logText = `Report status was set to <b>In Progress</b> by ${userName}`
//         break
//       case 'duplicate':
//         logText = `Report was marked as <b>Duplicate</b> by ${userName}`
//         break
//       default:
//         logText = `Report status was updated to <b>${status}</b> by ${userName}`
//     }

//     const logMessage = new Message({
//       reportId,
//       senderId: req.user.id,
//       senderModel: 'Triager',
//       message: `<b>${logText}</b>`,
//       messageType: 'log',
//     })

//     await logMessage.save()

//     const senderDetails = await Admin.findById(req.user.id).select(
//       'name email image _id'
//     )

//     const io = req.app.get('io')
//     io.to(reportId).emit('receiveMessage', {
//       ...logMessage.toObject(),
//       senderInfo: senderDetails || {
//         _id: 'system',
//         name: 'System',
//         image: 'https://img.icons8.com/ios-filled/50/activity-history.png',
//       },
//     })

//     return res.status(200).json({
//       success: true,
//       message: 'Report status updated successfully',
//       // report: existingReport,
//       // hacker: existingHacker,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     })
//   }
// }
// export const updateSeverity = async (req, res) => {
//   try {
//     const { reportId } = req.params
//     const { severity } = req.body
//     const userType = req.user.userType

//     if (userType !== 'triager') {
//       return res.status(403).json({
//         success: false,
//         message: 'Unauthorized',
//       })
//     }

//     if (!reportId || !severity) {
//       return res.status(400).json({
//         success: false,
//         message: 'Report ID and severity are required',
//       })
//     }

//     const existingReport = await Report.findById(reportId)

//     if (!existingReport) {
//       return res.status(404).json({
//         success: false,
//         message: 'Report not found',
//       })
//     }

//     if (existingReport.severity === severity) {
//       return res.status(200).json({
//         success: false,
//         message: `Severity is already "${severity}"`,
//       })
//     }

//     existingReport.severity = severity
//     await existingReport.save()

//     // Log message
//     let logText = ''
//     const userName = req.user?.name || 'a triager'

//     switch (severity.toLowerCase()) {
//       case 'critical':
//         logText = `Severity changed to <b>Critical</b> by ${userName} `
//         break
//       case 'high':
//         logText = `Severity changed to <b>High</b>

//         by ${userName}`
//         break
//       case 'moderate':
//         logText = `Severity changed to <b>Moderate</b> by ${userName}`
//         break
//       case 'low':
//         logText = `Severity changed to <b>Low</b> by ${userName}`
//         break
//       case 'informational':
//         logText = `Severity changed to <b>Informational</b> by ${userName}`
//         break
//       default:
//         logText = `Severity updated to <b>${severity}</b> by ${userName}`
//     }

//     const logMessage = new Message({
//       reportId,
//       senderId: req.user.id,
//       senderModel: 'Triager',
//       message: `<b>${logText}</b>`,
//       messageType: 'log',
//     })

//     await logMessage.save()

//     const senderDetails = await Admin.findById(req.user.id).select(
//       'name email image _id'
//     )

//     const io = req.app.get('io')
//     io.to(reportId).emit('receiveMessage', {
//       ...logMessage.toObject(),
//       senderInfo: senderDetails || {
//         _id: 'system',
//         name: 'System',
//         image: 'https://img.icons8.com/ios-filled/50/activity-history.png',
//       },
//     })

//     return res.status(200).json({
//       success: true,
//       message: 'Severity updated successfully',
//       report: existingReport,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     })
//   }
// }

export const updateStatus = async (req, res) => {
  try {
    const { reportId } = req.params
    const { status } = req.body
    const userType = req.user.userType

    if (userType !== 'triager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (!reportId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Report ID and status are required',
      })
    }

    const existingReport = await Report.findById(reportId)

    if (!existingReport) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      })
    }

    if (existingReport.status === status) {
      return res.status(200).json({
        success: false,
        message: `Status is already "${status}"`,
      })
    }

    // Update status
    existingReport.status = status
    await existingReport.save()

    const hackerId = existingReport.hackerId
    const programId = existingReport.programId

    // Define point changes for each status
    const statusPointsMap = {
      spam: -5,
      duplicate: -5,
      triage: 5,
      completed: 10,
    }

    // Apply leaderboard points
    if (status in statusPointsMap) {
      updateGlobalLeaderBoard(hackerId, statusPointsMap[status])
      updateProgramLeaderBoard(programId, hackerId, statusPointsMap[status])
    }

    // Generate custom log message with colors
    const userName = req.user?.name || 'triager'
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

    let color = '#9ca3af' // default gray
    switch (status.toLowerCase()) {
      case 'spam':
        color = '#ef4444' // red-500
        break
      case 'completed':
        color = '#10b981' // green-500
        break
      case 'in progress':
        color = '#f59e0b' // amber-500
        break
      case 'duplicate':
        color = '#f87171' // rose-400
        break
      case 'triage':
        color = '#6366f1' // indigo-500
        break
    }

    const logText = `Report status changed to <b style="color:${color}">${statusLabel}</b> by <span style="color:#38bdf8">${userName}</span>`

    const logMessage = new Message({
      reportId,
      senderId: req.user.id,
      senderModel: 'Triager',
      message: `<b>${logText}</b>`,
      messageType: 'log',
    })

    await logMessage.save()

    const senderDetails = await Admin.findById(req.user.id).select(
      'name email image _id'
    )

    const io = req.app.get('io')
    io.to(reportId).emit('receiveMessage', {
      ...logMessage.toObject(),
      senderInfo: senderDetails || {
        _id: 'system',
        name: 'System',
        image: 'https://img.icons8.com/ios-filled/50/activity-history.png',
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
}

export const updateSeverity = async (req, res) => {
  try {
    const { reportId } = req.params
    const { severity } = req.body
    const userType = req.user.userType

    if (userType !== 'triager') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (!reportId || !severity) {
      return res.status(400).json({
        success: false,
        message: 'Report ID and severity are required',
      })
    }

    const existingReport = await Report.findById(reportId)

    if (!existingReport) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      })
    }

    if (existingReport.severity === severity) {
      return res.status(200).json({
        success: false,
        message: `Severity is already "${severity}"`,
      })
    }

    existingReport.severity = severity
    await existingReport.save()

    // --- Construct Log Message ---
    const userName = req.user?.name || 'a triager'
    const label = severity.charAt(0).toUpperCase() + severity.slice(1)
    let color = ''

    switch (severity.toLowerCase()) {
      case 'critical':
        color = '#dc2626' // red-600
        break
      case 'high':
        color = '#ea580c' // orange-500
        break
      case 'moderate':
        color = '#eab308' // yellow-400
        break
      case 'low':
        color = '#22c55e' // green-500
        break
      case 'informational':
        color = '#3b82f6' // blue-500
        break
    }

    const logText = `Severity changed to <b style="color:${color}">${label}</b> by <span style="color:#38bdf8">${userName}</span>`

    const logMessage = new Message({
      reportId,
      senderId: req.user.id,
      senderModel: 'Triager',
      message: `<b>${logText}</b>`,
      messageType: 'log',
    })

    await logMessage.save()

    const senderDetails = await Admin.findById(req.user.id).select(
      'name email image _id'
    )

    const io = req.app.get('io')
    io.to(reportId).emit('receiveMessage', {
      ...logMessage.toObject(),
      senderInfo: senderDetails || {
        _id: 'system',
        name: 'System',
        image: 'https://img.icons8.com/ios-filled/50/activity-history.png',
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Severity updated successfully',
      report: existingReport,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
}

export const getAllReports = async (req, res) => {
  try {
    const allReports = await Report.find({ status: { $ne: 'draft' } })
      .populate('hackerId')
      .populate('programId')
    console.log(allReports)

    res.status(200).json({
      success: true,
      count: allReports.length,
      reports: allReports,
    })
  } catch (error) {
    console.error('Error fetching all reports:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reports',
    })
  }
}

export const getReportsByHackerId = async (req, res) => {
  try {
    const hackerId = req.user.id

    if (!hackerId) {
      return res.status(400).json({
        success: false,
        message: 'Hacker ID is required',
      })
    }

    const reports = await Report.find({ hackerId })

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    })
  } catch (error) {
    console.error('Error fetching hacker reports:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching hacker reports',
      error: error.message,
    })
  }
}

export const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params
    const report = await Report.findById(reportId)
      .populate('hackerId')
      .populate('programId')

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: 'Report not found' })
    }

    res.status(200).json({ success: true, report })
  } catch (error) {
    console.error('Error fetching report:', error)
    res
      .status(500)
      .json({ success: false, message: 'Server error while fetching report' })
  }
}
