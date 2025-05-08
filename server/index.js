import express from 'express'
import cors from 'cors'
import Company from './Models/company.js'
import dotenv from 'dotenv'
import connectDB from './Config/Db.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import companyRoute from './Routes/companyRoute.js'
import programRouter from './Routes/programRoutes.js'

dotenv.config()
const app = express()
connectDB()
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', (req, res) => {
  Company.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => console.log(err))
})

app.use('/api/auth', authRoute)
app.use('/api/company', companyRoute)
app.use('/api/program', programRouter)

app.get('/', (req, res) => {
  res.send('Hello from server!')
})

const port = process.env.PORT || 7000
app.listen(port, () => console.log(`Server is Running at port: ${port}`))
