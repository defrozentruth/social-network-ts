import Message from "../../../models/message.js";
import { MessageModel } from "../../../adapters/mongo/schema/message.js";
export default class MongoMessageRepository {
    async getMessagesInChat(user_id, friend_id) {
        const messageDocs = await MessageModel.find({
            $or: [
                { sender_id: user_id, receiver_id: friend_id },
                { sender_id: friend_id, receiver_id: user_id }
            ]
        }).lean().exec();
        return messageDocs.map(Message.MessageDocumentToMessage);
    }
    async getChats(user_id) {
        const chatParticipants = new Set();
        const messages = await MessageModel.find({
            $or: [{ sender_id: user_id }, { receiver_id: user_id }]
        }).exec();
        for (const message of messages) {
            if (message.sender_id !== user_id) {
                chatParticipants.add(message.sender_id);
            }
            if (message.receiver_id !== user_id) {
                chatParticipants.add(message.receiver_id);
            }
        }
        return Array.from(chatParticipants);
    }
    async getUserChats(user_id) {
        const chatKeys = (await this.getChats(user_id)) || [];
        const userChats = [];
        for (const friendId of chatKeys) {
            const messages = await this.getMessagesInChat(user_id, friendId);
            if (messages) {
                userChats.push(messages);
            }
        }
        return userChats;
    }
    async create(message) {
        const messageDoc = new MessageModel(message);
        await messageDoc.save();
        return Message.MessageDocumentToMessage(messageDoc);
    }
}
//# sourceMappingURL=message.js.map