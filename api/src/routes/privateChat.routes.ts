import { Router } from "express";
import { createPrivateChat } from "../controller/private/createPrivateChat";
import { deletePrivateChat } from "../controller/private/deletePrivateChat";
import { getPrivateChat } from "../controller/private/getAllPrivateChat";
import { sendPrivatemsg } from "../controller/private/senPrivateMessage";

const privateChat = Router();

privateChat.get('/:id', getPrivateChat)

privateChat.post('/', createPrivateChat)

privateChat.post('/:email', sendPrivatemsg)

privateChat.delete('/:id', deletePrivateChat)

export default privateChat;