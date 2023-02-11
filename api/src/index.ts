import express from "express";
import morgan from "morgan";
import cors from 'cors'
import router from "./routes/index.routes";
import { PORT } from "../config";
import { createServer } from "http";
import {Server as SocketServer } from 'socket.io'

const app = express();
const server = createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: '*'
  }
});


/// --------- Middleware ----------
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
//---------------------------------

app.use("/", router);

io.on('connection', (socket)=> {
  console.log(`user: ${socket.id} user connected`)
})

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

export default io