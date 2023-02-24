import { Request, Response } from "express";
import { GlobalChat } from "../../models/GlobalChat";
import { getModelForClass } from "@typegoose/typegoose";

const GlobalChatModel = getModelForClass(GlobalChat)

export const getGlobalChat = async (req: Request, res: Response) => {
    try {
        const AllMessages = await GlobalChatModel.find()
        .populate("author")

        const format = AllMessages.map( msg => {

            const f = {
                message: msg.message,
                author: { username: msg.author.username, picture: msg.author.picture, _id: msg.author["_id"]},
                date: msg.date,
                _id: msg.id
            }
            return f
        })

        res.status(200).json(format)
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}