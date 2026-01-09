import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateUsername } from "../utils/generateUsername.js";

const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      username = generateUsername();
    }

    const user = await User.findOne({ username });

    if (user) {
      user = generateUsername();
      user = await User.findOne({ username });
    }

    user = new User({ username });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      user: { id: user._id, username: user.username },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.length > 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }

    const existingUser = await User.findOne({ username });

    if (
      existingUser &&
      existingUser._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).json({ error: "Username already taken" });
    }

    await User.findByIdAndUpdate(req.user._id, { username });

    res.json({ username });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export {createUser, updateUsername}