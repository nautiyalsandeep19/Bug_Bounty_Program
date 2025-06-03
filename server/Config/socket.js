// import express from 'express'
// import http from 'http'
// import { Server } from 'socket.io'

// const app = express()
// const server = http.createServer(app)

// // Allow CORS from your frontend origin
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"], // Replace with your frontend URL
//     methods: ["GET", "POST"]
//   }
// });


// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });


// export { app ,io , server}


// ./Config/socket.js
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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

export { app, server, io }
