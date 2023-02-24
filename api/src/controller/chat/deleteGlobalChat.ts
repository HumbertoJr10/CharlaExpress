import { Request, Response } from "express";
import { GlobalChat } from "../../models/GlobalChat";
import { getModelForClass } from "@typegoose/typegoose";

const GlobalChatModel = getModelForClass(GlobalChat)

export const deleteGlobalChat = async ( req: Request, res: Response)=> {
    try {
        const { _id } = req.params;
        
        const message = await GlobalChatModel.findOneAndDelete({ _id })
        
        res.status(200).json('Mensaje eliminado')

    } catch (error) {
        res.status(404).json(error)
    }
}