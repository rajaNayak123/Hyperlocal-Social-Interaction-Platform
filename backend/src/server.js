import express from 'express';
import dotenv from 'dotenv';
import http from 'http'
import { Server } from "socket.io";
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"

dotenv.config(); 

import {connectToDB} from "./config/database.js"
import {socketService} from "./services/socketService.js"
// imports the routes
import { router as userRouter } from "../src/routes/userRoutes.js"
import { router as roomRouter } from "./routes/roomRoutes.js"
import { router as messageRoute } from "./routes/messageRoutes.js"
const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
connectToDB()

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : true,
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/message", messageRoute);

socketService(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
