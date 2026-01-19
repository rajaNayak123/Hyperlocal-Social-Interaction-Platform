import { Message } from "../models/Message.js";

const socketService = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log("User joined room:", roomId);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { roomId, text, username } = data;

        const message = new Message({
          roomId,
          userId: data.userId,
          username,
          text,
        });

        await message.save();

        // Broadcast to room
        io.to(roomId).emit("newMessage", message);
      } catch (error) {
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export {socketService}
