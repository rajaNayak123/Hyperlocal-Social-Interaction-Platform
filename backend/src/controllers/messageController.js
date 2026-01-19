import { Message } from "../models/Message.js";
import { Room } from "../models/Room.js";

const sendMessage = async (req, res) => {
  try {
    const { roomId, text } = req.body;

    // verify the room is exist or not
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found or expired" });
    }

    const message = new Message({
      roomId,
      userId: req.user._id,
      username: req.user.username,
      text,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ "Error while send the message": error });
  }
};

const getMessage = async () => {
  try {
    const { roomId } = req.params;

    const messages = await Message.findById({ roomId })
      .populate("userId", "username")
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ "Error while get the message": error });
  }
};

export{sendMessage, getMessage}
