// utils/logger.js
import winston from 'winston'
import path from 'path'
import fs from 'fs'

// Ensure the logs directory exists
const logDir = 'logs'
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`
    })
  ),
  transports: [
    // Write all logs to a file
    new winston.transports.File({
      filename: path.join(logDir, 'api-requests.log'),
    }),

    // Optional: also log to console in development
    // new winston.transports.Console(),
  ],
})

export default logger
