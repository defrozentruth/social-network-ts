import {MessageDocument} from "~server-src/adapters/mongo/schema/message.js";

export default class Message{
    constructor(
        public sender_id?: number,
        public receiver_id?: number,
        public sender_name?: string,
        public text?: string,
        public timestamp?: Date
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new Message(), obj)
    }

    static MessageDocumentToMessage(messageDoc: MessageDocument): Message {
        return new Message(
            messageDoc.sender_id,
            messageDoc.receiver_id,
            messageDoc.sender_name,
            messageDoc.text,
            messageDoc.timestamp,
        );
    }

}