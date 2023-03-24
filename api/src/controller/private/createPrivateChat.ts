import {Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../../models/User';
import { PrivateChat } from '../../models/PrivateChat';

const UserModel = getModelForClass(User)
const PrivateChatModel = getModelForClass(PrivateChat)

export const createPrivateChat = async (req: Request, res:Response) => {
    try {
        const { id1, id2 } = req.body;

        if (!id1 || !id2) {
            return res.status(404).json('Faltan uno o más parametros')
        }

        //const user1 = await UserModel.findById(id1).populate("chat")
        //const user2 = await UserModel.findById(id2).populate("chat")
        const user1 = await UserModel.findById(id1).populate({path: "chat", populate: "participants", })
        const user2 = await UserModel.findById(id2).populate({path: "chat", populate: "participants", })

        if (!user1 || !user2) {
            return res.status(404).json('Error al encontrar uno de los usuarios')
        }
         
        
        for (let f = 0; f<user1.chat.length; f++) {
            if (user1.chat[f].participants[0].username == user2.username || user1.chat[f].participants[1].username == user2.username) {
                
                
                return res.status(200).json(user1.chat[f])
            }
        }
    
        const newChat = new PrivateChatModel({
            participants: [],
            chat: []
        })
        await newChat.save()

        newChat.participants.push(user1)
        newChat.participants.push(user2)

        await newChat.save()

        user1.chat.push(newChat)
        await user1.save()

        user2.chat.push(newChat)
        await user2.save()

        return res.status(201).json(newChat);
        
    } catch (error: any) {
        res.status(408).json({error: error?.message})
    }
}