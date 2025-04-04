import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app , server } from './lib/socket.js';

import dotenv from 'dotenv';
import {connectDB} from './lib/db.js'

import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
   })
);
app.use(cookieParser());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);


server.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);
    connectDB();
})