import express from "express"
import cors from "cors"
import Company from "./Models/company.js"
import dotenv from 'dotenv'
import connectDB from './Config/Db.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import companyRoute from './Routes/companyRoute.js'
import programRoutes from './Routes/programRoutes.js'

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
app.use(cors())

app.post('/register',(req,res)=>{
    Company.create(req.body).then(employee => res.json(employee)).catch(err =>console.log(err))
})



app.use('/api/auth', authRoute)
app.use('/api/company',companyRoute)
app.use("/api/programs", programRoutes);


app.get('/', (req, res) => {
  res.send('Hello from server!')
})

const port = process.env.PORT || 7000
app.listen(port, () => console.log(`Server is Running at port: ${port}`))








