import { Router } from "express";
import { getAllUser } from "../controller/getAllUser";
import { postUser } from "../controller/postUser";

const User = Router()

User.get('/', getAllUser);

User.post('/', postUser);



export default User;