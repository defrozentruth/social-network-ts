export default class Message {
    sender_id;
    receiver_id;
    sender_name;
    text;
    timestamp;
    constructor(sender_id, receiver_id, sender_name, text, timestamp) {
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.sender_name = sender_name;
        this.text = text;
        this.timestamp = timestamp;
    }
    static fromObject(obj) {
        return Object.assign(new Message(), obj);
    }
}
//# sourceMappingURL=message.js.map