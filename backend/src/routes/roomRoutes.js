import express from "express"
import {createRoom, getNearbyRooms, getRoom} from "../controllers/roomController.js"
import {auth} from "../middleware/auth.js"
import {createRoomLimiter} from "../middleware/rateLimit.js"

const router = express.Router()

router.post('/', auth, createRoomLimiter, createRoom)
router.get("/nearby", getNearbyRooms)
router.get("/:id", getRoom)

export {roomRouter}