import e from "express";
import {UserDocument, UserModel} from "../adapters/mongo/schema/user.js";

export default async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const decodedTokenData = req.token;
    const userRecord = await UserModel.findOne({id: decodedTokenData.id})

    req.currentUser = userRecord as UserDocument;

    if (!userRecord) {
        return res.status(401).end('User not found')
    } else {
        return next();
    }
}