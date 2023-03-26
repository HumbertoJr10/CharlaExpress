import { Request, Response } from "express";
import { getModelForClass } from "@typegoose/typegoose";
import { PrivateChat } from "../../models/PrivateChat";
import { User } from "../../models/User";

const PrivateModel = getModelForClass(PrivateChat)
const UserModel = getModelForClass(User)

export const deletePrivateChat = async (req: Request, res:Response) => {
    try {
        const { id } = req.params

        const privateChat = await PrivateModel.findById(id)

        if (!privateChat) {
            return res.status(404).json("EL CHAT NO EXISTE")
        }
        const user1 = await UserModel.findById(privateChat.participants[0]._id)
        const user2 = await UserModel.findById(privateChat.participants[1]._id)

        if (!user1 || !user2) {
            return res.status(404).json('usuarios no existen')
        }


        const newChats1 = user1.chat.filter( e => e._id != id)
        user1.chat = newChats1
        await user1.save()

        const newChats2 = user2.chat.filter( e => e._id != id)
        user2.chat = newChats2
        await user2.save()

        await privateChat.delete()
        
        return res.status(201).json('Chat Deleted')

    } catch (error) {
        res.status(408).json(error)
    }
} 