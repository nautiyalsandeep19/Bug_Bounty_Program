import express from "express"
import connectDB from "./Config/DB.js"
import cors from "cors"
import Company from "./Models/company.js"

const app = express()
connectDB()
app.use(express.json())
app.use(cors())

app.post('/register',(req,res)=>{
    Company.create(req.body).then(employee => res.json(employee)).catch(err =>console.log(err))
})

app.listen(3000,()=>{
    console.log("connected")
})