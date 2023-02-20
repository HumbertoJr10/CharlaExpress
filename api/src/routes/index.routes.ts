import { Router } from "express";
import User from "./user.routes";

const router = Router()

router.use('/users', User);

export default router;