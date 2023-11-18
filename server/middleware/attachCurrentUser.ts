import e from "express";
import {User} from "../models/user.js";
import AuthRepository from "~server-src/repository/auth";
import UserRepository from "~server-src/repository/user";

export default async (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const decodedTokenData = req.token;
    const UsRep = new UserRepository;
    const userRecord = await UsRep.getById(decodedTokenData.id)
    //const userRecord = await UserModel.findOne({id: decodedTokenData.id})

    req.currentUser = userRecord;// as UserDocument;

    if (!userRecord) {
        return res.status(401).end('User not found')
    } else {
        return next();
    }
}