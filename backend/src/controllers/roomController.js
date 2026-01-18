import { Room } from "../models/Room.js";

const createRoom = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    if (!name || !latitude || !longitude) {
      throw new Error("Invalid input");
    }

    const room = new Room({
      name,
      location: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
      creatorId: req.user._id,
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ "Error while create the room": error });
  }
};

const getNearbyRooms = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const rooms = await Room.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        },
        $maxDistance: 5000,
      },
    }).limit(50);

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ "Error while get near rooms": error });
  }
};

const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { createRoom, getNearbyRooms, getRoom };
