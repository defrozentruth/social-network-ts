import e from "express";
import UserController from "../controllers/user";

export default class FriendRouter{
    constructor(private readonly controller: UserController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/:id(\\d+)', this.controller.getFriendsByUserId);
        router.post('/:id(\\d+)/:friendId(\\d+)', this.controller.addFriend)
        router.delete('/:id(\\d+)/:friendId(\\d+)', this.controller.deleteFriend)
        return router
    }
}