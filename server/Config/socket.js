import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Message from '../Models/message.js'
import Hacker from '../Models/hacker.js'
import Company from '../Models/company.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.set("io", io);
const userSocketMap = {}
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  const userId = socket.handshake.query.userId
  // console.log("query: ",socket.handshake.query.userId);

  console.log('userId from backend: ', userId)

  if (userId) userSocketMap[userId] = socket.id

  // Join room function
  socket.on('joinRoom', (reportId) => {
    socket.join(reportId)
    console.log(`Socket ${socket.id} joined room ${reportId}`)
  })

  // Send Message function
  socket.on(
    'sendMessage',
    async ({ reportId, senderId, senderModel, message , messageType}) => {
      try {
        const newMsg = new Message({
          reportId,
          senderId,
          senderModel,
          message,
          messageType
        })
        await newMsg.save()

        let senderDetails = null

        if (newMsg.senderModel === 'Hacker') {
          senderDetails = await Hacker.findById(newMsg.senderId).select(
            'username email image name _id'
          )
        } else if (newMsg.senderModel === 'Company') {
          senderDetails = await Company.findById(newMsg.senderId).select(
            'name email image _id'
          )
        }

        const completeMessage = {
          ...newMsg.toObject(),
          senderInfo: senderDetails,
        }

        io.to(reportId).emit('receiveMessage', completeMessage)
      } catch (err) {
        console.error('Error saving message:', err)
      }
    }
  )

  socket.on('disconnect', () => {
    console.log('User disconnected backend:', socket.id)
    delete userSocketMap[userId]
  })
})

export { app, server, io }
