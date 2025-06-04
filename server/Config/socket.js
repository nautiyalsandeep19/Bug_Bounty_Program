import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})


const userSocketMap = {}
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  const userId = socket.handshake.query.userId
// console.log("query: ",socket.handshake.query.userId);

  console.log("userId from backend: ",userId)
  
  if(userId) userSocketMap[userId] = socket.id

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    delete userSocketMap[userId]
  })
})

export { app, server, io }
