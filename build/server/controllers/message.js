import { getIo } from "../socket.js";
import Message from "../models/message.js";
import * as Sentry from "@sentry/node";
export default class MessageController {
    messageRepo;
    constructor(messageRepo) {
        this.messageRepo = messageRepo;
    }
    getMessagesInChat = async (req, res) => {
        try {
            const user_id = parseInt(req.params["id"]);
            const friend_id = parseInt(req.params["friend_id"]);
            const messages = await this.messageRepo.getMessagesInChat(user_id, friend_id);
            if (!messages) {
                res.status(404).json({ error: `Chat between id ${user_id} and ${friend_id} does not exist` });
            }
            else {
                res.status(200).json(messages);
            }
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    getChats = async (req, res) => {
        try {
            const user_id = parseInt(req.params["id"]);
            const chats = await this.messageRepo.getChats(user_id);
            res.status(200).json(chats);
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(500).json({ error: error.message });
        }
    };
    createMessage = async (req, res) => {
        try {
            const message = Message.fromObject(req.body);
            message.sender_id = parseInt(req.params["id"]);
            message.receiver_id = parseInt(req.params["friendId"]);
            const createdMessage = await this.messageRepo.create(message);
            getIo().emit('message', JSON.stringify(createdMessage));
        }
        catch (e) {
            Sentry.captureException(e);
            res.status(400).json({ error: e.message });
        }
    };
}
//# sourceMappingURL=message.js.map