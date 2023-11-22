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
            res.status(500).json({ error: error.message });
        }
    };
}
//# sourceMappingURL=message.js.map