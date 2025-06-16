import Message from '../Models/message.js'
import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'
import Report from '../Models/Report.js'
import Admin from '../Models/admin.js'

export const getMessagesForReport = async (req, res) => {
  const { reportId } = req.params

  try {
    const messages = await Message.find({ reportId }).sort({ createdAt: 1 })

    const populatedMessages = await Promise.all(
      messages.map(async (msg) => {
        let senderDetails = null

        if (msg.senderModel === 'Hacker') {
          senderDetails = await Hacker.findById(msg.senderId).select(
            'username email image name _id'
          )
        } else if (msg.senderModel === 'Company') {
          senderDetails = await Company.findById(msg.senderId).select(
            'name email image _id'
          )
        } else if (msg.senderModel === 'Triager') {
          senderDetails = await Admin.findById(msg.senderId).select(
            'name email _id'
          )
        }

        return {
          ...msg.toObject(),
          senderInfo: senderDetails,
        }
      })
    )

    res.status(200).json({ success: true, messages: populatedMessages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch messages' })
  }
}

export const getLogsForHacker = async (req, res) => {
  try {
    const { hackerId } = req.params
    console.log('HackerID backend: ', hackerId)

    if (!hackerId) {
      return res.status(400).json({
        success: false,
        message: 'Hacker ID is required',
      })
    }

    // Find all reports submitted by this hacker
    const reports = await Report.find({ hackerId: hackerId }).select('_id')

    const reportIds = reports.map((r) => r._id)

    // Now fetch log messages for those reports (i.e. roomId == reportId)
    const logs = await Message.find({
      messageType: 'log',
      reportId: { $in: reportIds },
    })
      .sort({ createdAt: -1 }) // latest logs first
      .lean()
      .populate({
        path: 'reportId',
        populate: {
          path: 'programId', // this field should exist in the Report schema
        },
      })

    return res.status(200).json({
      success: true,
      logs,
    })
  } catch (error) {
    console.error('Error fetching logs for hacker:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching logs',
    })
  }
}
