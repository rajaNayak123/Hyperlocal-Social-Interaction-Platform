import rateLimit from "express-rate-limit"

const createRoomLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5,
    message: 'Too many room creation attempts, try again later.'
})

const messageLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
    message: 'Too many messages, slow down!'
})

export { createRoomLimiter, messageLimiter}