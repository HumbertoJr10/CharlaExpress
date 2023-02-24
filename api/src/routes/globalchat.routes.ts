import { Router } from "express";
import { createGlobalChat } from "../controller/chat/createGlobalChat";
import { deleteGlobalChat } from "../controller/chat/deleteGlobalChat";
import { getGlobalChat } from "../controller/chat/getGlobalChat";


const globalchat = Router()

globalchat.get('/', getGlobalChat);

globalchat.post('/:email', createGlobalChat);

globalchat.delete('/:_id', deleteGlobalChat);

export default globalchat;