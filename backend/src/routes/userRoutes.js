import express from "express"
import {createUser, updateUsername} from "../controllers/userController.js"
import { auth } from "../middleware/auth.js"
import { sanitizeUser } from "../middleware/sanitize.js";

const router = express.Router();

router.post("/", sanitizeUser, createUser)
router.put("/username", auth, sanitizeUser, updateUsername)

export{userRouter}