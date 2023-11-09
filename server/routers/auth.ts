import e from "express";
import {AuthController} from "../controllers/auth";

export default class AuthRouter{
    constructor(private readonly controller: AuthController) {}
    public getRouter(){
        const router = e.Router()
        router.post('/login', this.controller.Login);
        router.post('/register', this.controller.SignUp);
        return router
    }
}