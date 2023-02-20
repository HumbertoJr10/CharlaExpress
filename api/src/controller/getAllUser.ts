import { Request, Response } from 'express';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/User';

const UserModel = getModelForClass(User)

export const getAllUser = async (_req: Request, res: Response) => {
    try {

        const allUser = await UserModel.find()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(400).json({msg: error})
    }
}