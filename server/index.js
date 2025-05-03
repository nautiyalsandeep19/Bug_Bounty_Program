import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./Config/DB.js";

dotenv.config();

const app = express()
connectDB();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello from server!");
});

  
const port =  process.env.PORT || 7000;
app.listen(port, ()=>console.log(`Server is Running at port: ${port}`))