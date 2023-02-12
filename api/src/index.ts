import { PORT } from "../config";
import Server from "./server";
import { Server as SocketServer } from "socket.io";

const io = new SocketServer(Server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user: ${socket.id} user connected`);

  /*
  socket.on("message", (message) => {
    console.log(`${socket.id} dice: ${message}`);
    socket.broadcast.emit("message", message);
  });
  */

});

Server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
