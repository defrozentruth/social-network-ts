import Message from "../models/message";

export default interface MessageRepository {
    getMessagesInChat(user_id: number, friend_id: number): Promise<Message[]>;
    getChats(user_id: number): Promise<number[]>;
    getUserChats(user_id: number): Promise<Message[][]>;
    create(message: Message): Promise<Message>;
}