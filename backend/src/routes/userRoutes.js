import express from "express"
import {createUser, updateUsername} from "../controllers/userController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.post("/", createUser)
router.put("/username", auth, updateUsername)

export{userRouter}