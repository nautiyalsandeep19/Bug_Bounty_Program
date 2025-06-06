// src/socket.js
import { io } from 'socket.io-client'

let socket = null
const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL
export const connectSocket = (userId) => {
  socket = io(BASE_URL, {
    query: { userId },
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    console.log('Socket disconnected')
  }
}
