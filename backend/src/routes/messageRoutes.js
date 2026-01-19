import express from "express"
import { sendMessage, getMessage } from "../controllers/messageController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.post("/", auth, sendMessage)
router.get("/room/:roomId", auth, getMessage)

export {messageRoute}