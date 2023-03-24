import {Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../../models/User';
import { PrivateChat } from '../../models/PrivateChat';

const UserModel = getModelForClass(User)
const PrivateChatModel = getModelForClass(PrivateChat)

export const getPrivateChat = async (req: Request, res:Response) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(404).json('Debe incluir un ID')
        }

        const user = await UserModel.findById(id).populate({path: "chat", populate: "participants", })
        res.status(200).json(user?.chat)
        
    } catch (error) {
        res.status(408).json(error)
    }
}