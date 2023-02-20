import { PORT } from "./config";
import Server from "./server";
import { connect, set } from 'mongoose'
import { Server as SocketServer } from "socket.io";
//import { DB_USER, DB_PASSWORD, DB_NAME, PORT } from './config'

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

set('strictQuery', true)

async function connectDB() {
  const db = await connect('mongodb+srv://Lunaku:PAetPruf25XaYAh5@cluster0.lnixbat.mongodb.net/test')
  Server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
  });
}


connectDB()