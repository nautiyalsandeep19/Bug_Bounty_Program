import Admin from '../Models/admin.js'
import Message from '../Models/message.js'
import Report from '../Models/Report.js'
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
      status,
      submitDate,
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

export const updateStatus = async (req, res) => {
  try {
    const { reportId } = req.params
    const { status } = req.body

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

    // ✅ If status is already same, do nothing
    if (existingReport.status === status) {
      return res.status(200).json({
        success: false,
        message: `Status is already "${status}"`,
      })
    }

    // Update status
    existingReport.status = status
    await existingReport.save()

    const logText = `Report status was updated to "${status}" by ${
      req.user?.name || 'a triager'
    }`

    const logMessage = new Message({
      reportId,
      senderId: req.user.id,
      senderModel: 'Triager',
      message: `<i>${logText}</i>`,
      messageType: 'log',
    })

    await logMessage.save()

    // Fetch sender info to emit with message
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
    const allReports = await Report.find()
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
export const getReportsById = async (req, res) => {
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
