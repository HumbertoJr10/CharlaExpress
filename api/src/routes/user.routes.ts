import { Router } from "express";
import { getAllUser } from "../controller/users/getAllUser";
import { postUser } from "../controller/users/postUser";

const User = Router();

User.get("/", getAllUser);

User.post("/", postUser);

export default User;
