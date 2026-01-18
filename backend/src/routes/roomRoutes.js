import express from "express"
import {createRoom, getNearbyRooms, getRoom} from "../controllers/roomController.js"
import {auth} from "../middleware/auth.js"

const router = express.Router()

router.post('/', auth, createRoom)
router.get("/nearby", getNearbyRooms)
router.get("/:id", getRoom)

export {roomRouter}