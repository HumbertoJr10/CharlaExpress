import { Request, Response} from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { PrivateChat } from '../../models/PrivateChat';
import { User } from '../../models/User';
import { Message } from '../../models/Message';

const UserModel = getModelForClass(User)
const PrivateModel = getModelForClass(PrivateChat)
const MessageModel = getModelForClass(Message)

export const sendPrivatemsg = async (req: Request, res: Response) => {
    try {
        const { email } = req.params
        const { message, id } = req.body

        const user = await UserModel.findOne({ email })
        const privateChat = await PrivateModel.findById(id)

        if (!user) {
            return res.status(500).json(`El usuario con el email: ${email} no existe`)
        }

        if(!privateChat) {
            return res.status(500).json(`El chat no existe`)
        }

        const newMessage = {
            author: user,
            message,
        }

        const messageAdded = new MessageModel(newMessage)
        await messageAdded.save()
        
        privateChat.chat.push(messageAdded)
        await privateChat.save()

        return res.status(201).json(messageAdded)

    } catch (error) {
        res.status(400).json({ msg: error });
    }
}