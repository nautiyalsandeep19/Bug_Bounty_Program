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
      return res
        .status(400)
        .json({ success: false, message: 'Report ID and status are required' })
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    )

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: 'Report not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
      report,
    })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message })
  }
}

export const getAllReports = async (req, res) => {
  try {
    const allReports = await Report.find() // populate hacker info

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
