import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { server,app } from "./lib/socket.js";

dotenv.config();


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = process.env.PORT

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`); 
    connectDB(); 
})