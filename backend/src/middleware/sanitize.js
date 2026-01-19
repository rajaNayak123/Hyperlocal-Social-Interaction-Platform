import { body, validationResult } from "express-validator";

const sanitizeUser = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username must be 3-20 alphanumeric characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

const sanitizeRoom = [
  body("name").trim().escape().notEmpty().isLength({ max: 100 }),
  body("latitude").isFloat({ min: -90, max: 90 }),
  body("longitude").isFloat({ min: -180, max: 180 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

const sanitizeMessage = [
  body("text").trim().escape().notEmpty().isLength({ max: 500 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  },
];

export {sanitizeMessage, sanitizeUser, sanitizeRoom}