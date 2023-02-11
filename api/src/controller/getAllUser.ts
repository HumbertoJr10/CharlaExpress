import { Request, Response } from 'express';

export const getAllUser = async (_req: Request, res: Response) => {
    try {
        res.status(200).json('DONE')
    } catch (error) {
        res.status(400).json({msg: error})
    }
}