import * as argon2 from 'argon2'
import UserRepository from "../repository/user.js";
import {User} from "../models/user.js";
import AuthRepository from "../repository/auth.js";
import AuthData from "../models/auth.js";
import e from "express";
import pkg from 'jsonwebtoken';
import * as Sentry from "@sentry/node";

export class AuthController{
    constructor(
       private userRepo: UserRepository,
       private authRepo: AuthRepository
    ) {}

    public SignUp = async(req: e.Request, res: e.Response) => {
        try{
            const {email, password, name} = req.body
            const passwordHashed = await argon2.hash(password)
            const id = await this.userRepo.getCountUsers()+1;
            const userRecord = await this.authRepo.create(new AuthData(id, email, passwordHashed))

            if(!userRecord){
                throw new Error(`Error during creating account`)
            }

            const user = await this.userRepo.create(User.fromObject({
                id: userRecord.id,
                name: name,
                email: userRecord.email,
                role: "user",
                status: "unverified"
            }))

            res.status(200).send(JSON.stringify(user))
        }catch (error: any){
            Sentry.captureException(error);
            console.log(`Error during login`, error)
        }
    }

    public Login = async (req: e.Request, res: e.Response) => {
        try{
            const {email, password} = req.body
            const userRecord = await this.authRepo.getUserByEmail(email);
            const correctPassword = await argon2.verify(userRecord.password!, password)
            if(!correctPassword){
                throw new Error('Incorrect password')
            }
            res.status(200).send(JSON.stringify({
                user: await this.userRepo.getById(userRecord.id!),
                token: this.generateJWT(userRecord)
            }))
        }catch (error: any){
            Sentry.captureException(error);
            console.log(`Error during login`, error)
        }
    }

    private generateJWT(authData: AuthData){
        const data = {
            id: authData.id,
            email: authData.email,
        }

        const signature = 'sEKret_VVord';
        const expiration = '1h'

        const {sign} = pkg
        return sign({data,}, signature, {expiresIn: expiration});
    }
}