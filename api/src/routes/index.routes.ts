import { Router } from "express";
import globalchat from "./globalchat.routes";
import User from "./user.routes";

const router = Router()

router.use('/users', User);

router.use('/globalchat', globalchat);

export default router;