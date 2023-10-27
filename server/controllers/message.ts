import MessageRepository from "../repository/message.js";
import e from "express";

export default class MessageController {
    constructor(private messageRepo: MessageRepository) {}

    public getMessagesInChat = async (req: e.Request, res: e.Response) => {
        try {
            const user_id: number = parseInt(req.params["id"]);
            const friend_id: number = parseInt(req.params["friend_id"]);

            const messages = await this.messageRepo.getMessagesInChat(user_id, friend_id);

            if (!messages) {
                res.status(404).json({ error: `Chat between id ${user_id} and ${friend_id} does not exist` });
            } else {
                res.status(200).json(messages);
            }
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    public getChats = async (req: e.Request, res: e.Response) => {
        try {
            const user_id: number = parseInt(req.params["id"]);

            const chats = await this.messageRepo.getChats(user_id);

            res.status(200).json(chats);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}