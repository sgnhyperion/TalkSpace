import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(5000, ()=>{
    console.log("server is running on port 5000");  
})