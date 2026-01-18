import express from 'express';
import dotenv from 'dotenv';
import {connectToDB} from "./config/database.js"

dotenv.config(); 

// imports the routes
import { userRouter } from "../src/routes/userRoutes.js"
import { roomRouter } from './routes/roomRoutes.js';

const app = express();
connectToDB()

app.use("api/user", userRouter)
app.use("api/room", roomRouter)

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});
