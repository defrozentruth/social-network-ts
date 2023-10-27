import e from "express";
import UserController from "../controllers/user.js";

export default class FriendRouter{
    constructor(private readonly controller: UserController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/:id', this.controller.getFriendsByUserId);
        return router
    }
}