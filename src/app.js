import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
// import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json()); // handles JSON body
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"))
app.use(cookieParser());// app.use(cookieParser())
import userRouter from './routes/user.routes.js'
import quizRoutes from "./routes/quiz.routes.js";
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/users", userRouter)

export default app;