import express from "express"
import { sendMessage, getMessage } from "../controllers/messageController.js"
import { auth } from "../middleware/auth.js"
import { messageLimiter } from "../middleware/rateLimit.js"

const router = express.Router()

router.post("/", auth, messageLimiter, sendMessage)
router.get("/room/:roomId", auth, getMessage)

export {messageRoute}