import { Router } from "express";
import { getAllUser } from "../controller/getAllUser";

const User = Router()

User.get('/', getAllUser)

export default User;