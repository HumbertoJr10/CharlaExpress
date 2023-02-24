import { Request, Response } from "express";
import { getModelForClass } from "@typegoose/typegoose";
import { GlobalChat } from "../../models/GlobalChat";
import { User } from "../../models/User";

const GlobalChatModel = getModelForClass(GlobalChat)
const UserModel = getModelForClass(User)

export const createGlobalChat = async (req: Request, res: Response) => {
    try {
        const { email } = req.params
        const { message } = req.body

        const user = await UserModel.findOne({ email})

        if (!user) {
            return res.status(500).json(`El usuario con el email: ${email} no existe`)
        }

        const newMessage = {
            author: user,
            message,
        }

        const messageAdded = new GlobalChatModel(newMessage)
        await messageAdded.save()
        res.status(201).json(messageAdded)

    } catch (error) {
        res.status(400).json({ msg: error });
    }
}