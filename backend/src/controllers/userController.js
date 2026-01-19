import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateUsername } from "../utils/generateUsername.js";

const createUser = async (req, res) => {
  try {
    let { username } = req.body;

    if (!username) {
        username = generateUsername();
        let userExists = await User.findOne({ userName: username });
        // Simple retry loop to ensure uniqueness for generated usernames
        while (userExists) {
            username = generateUsername();
            userExists = await User.findOne({ userName: username });
        }
    } else {
        const existingUser = await User.findOne({ userName: username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }
    }

    const user = new User({ userName: username });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      user: { id: user._id, username: user.userName },
      token,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }

    const existingUser = await User.findOne({ userName: username });

    if (
      existingUser &&
      existingUser._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).json({ error: "Username already taken" });
    }

    await User.findByIdAndUpdate(req.user._id, { userName: username });

    res.json({ username });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export {createUser, updateUsername}