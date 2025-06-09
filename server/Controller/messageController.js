import Message from '../Models/message.js'
import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'
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
        } else if( msg.senderModel === 'Triager'){
          senderDetails = await Admin.findById(msg.senderId).select('name email _id')
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
