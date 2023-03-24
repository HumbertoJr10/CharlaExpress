import { Router } from "express";
import { createPrivateChat } from "../controller/private/createPrivateChat";
import { getPrivateChat } from "../controller/private/getAllPrivateChat";

const privateChat = Router();

privateChat.get('/:id', getPrivateChat)

privateChat.post('/', createPrivateChat)

export default privateChat;