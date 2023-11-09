import e from "express";
import MessageController from "../controllers/message.js";

export default class MessageRouter{
    constructor(private readonly controller: MessageController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/:id(\\d+)', this.controller.getChats);
        router.get('/:id(\\d+)/:friend_id(\\d+)', this.controller.getMessagesInChat)
        router.post('/:id(\\d+)/:friendId(\\d+)', this.controller.createMessage)
        return router
    }
}