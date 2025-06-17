import express from 'express'
import cors from 'cors'
import Company from './Models/company.js'
import dotenv from 'dotenv'
import connectDB from './Config/Db.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import companyRoute from './Routes/companyRoute.js'
import programRouter from './Routes/programRoutes.js'
import assetRouter from './Routes/assetRoute.js'
import hackerRoute from './Routes/hackerRoutes.js'
import uploaderRouter from './Routes/uploaderRoute.js'
import { authMid } from './Middleware/authMid.js'
import logRequest from './Middleware/logRequest.js'
import reportRoute from './Routes/reportRoute.js'
import messageRoute from './Routes/messageRoute.js'
import { app, server } from './Config/socket.js'

dotenv.config()
connectDB()

app.use(cookieParser())

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175'],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', uploaderRouter)

app.post('/register', (req, res) => {
  Company.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => console.log(err))
})

app.use('/api/auth', authRoute)

app.use('/api/programs', programRouter)
app.use(authMid)
app.use(logRequest)

app.use('/api/company', companyRoute)
app.use('/api/assets', assetRouter)
app.use('/api/hacker', hackerRoute)
app.use('/api/reports', reportRoute)
app.use('/api/messages', messageRoute)

app.get('/', (req, res) => {
  res.send('Hello from server!')
})

const port = process.env.PORT || 7000
server.listen(port, () => console.log(`Server is Running at port: ${port}`))
