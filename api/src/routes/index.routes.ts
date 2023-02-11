import { Router } from "express";
import User from "./user.routes";

const router = Router()

router.use('/user', User);

export default router;