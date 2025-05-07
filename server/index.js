import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/Db.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import companyRoute from './Routes/companyRoute.js'

dotenv.config()

const app = express()
connectDB()
app.use(cookieParser())

app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/company',companyRoute)

app.get('/', (req, res) => {
  res.send('Hello from server!')
})

const port = process.env.PORT || 7000
app.listen(port, () => console.log(`Server is Running at port: ${port}`))
