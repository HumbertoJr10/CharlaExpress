import { Router } from "express";
import globalchat from "./globalchat.routes";
import privateChat from "./privateChat.routes";
import User from "./user.routes";

const router = Router()

router.use('/users', User);

router.use('/globalchat', globalchat);

router.use('/privatechat', privateChat)

export default router;