import mongoose, { Schema } from 'mongoose';
const MessageSchema = new Schema({
    sender_id: Number,
    receiver_id: Number,
    sender_name: String,
    text: String,
    timestamp: Date
});
export const MessageModel = mongoose.model('message', MessageSchema);
//# sourceMappingURL=message.js.map