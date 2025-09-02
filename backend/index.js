import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
//import dotenv from "dotenv"
import adminRoute from "./routes/adminRoute.js"
import publicRoute from "./routes/publicRoute.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true 
}

app.get("/", (req,res)=>{
    res.send("API IS WORKING")
})
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB database is connected')
    } catch (err) {
        console.log("MongoDB database is connection failed")
        
    }
}



// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/public',publicRoute)

app.listen(port, ()=>{
    connectDB();
    console.log("server is running on port" + port)
})
