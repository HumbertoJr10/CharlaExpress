import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.routes";
import { createServer } from "http";

const app = express();
const Server = createServer(app);

// ----- MIDDLEWARE -----
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//-----------------------

app.use("/", router);

export default Server;
