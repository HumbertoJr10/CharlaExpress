import { Request, Response } from "express";
import { User } from "../models/User";
import { getModelForClass } from "@typegoose/typegoose";

const UserModel = getModelForClass(User);

export const postUser = async (req: Request, res: Response)=> {
    try {
        const { username, email, password, picture } = req.body;

        if (!username || !email || !password || !picture) {
        return res.status(500).json('Hay datos incompletos')
        }

        const findUser = await UserModel.findOne({email})
        if (findUser) {
            return res.status(500).json(`El email ${email} ya se encuentra asignado a otro usuario`)
        }

        const newUser = new UserModel({username, email, password, picture})
        await newUser.save()
        return res.status(200).json('Usuario Creado')

    } catch (error) {
        res.status(400).json('error: ' + error)
    }
}
