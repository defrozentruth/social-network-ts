import mongoose, { Document, Schema } from 'mongoose';

const MessageSchema = new Schema({
    sender_id: Number,
    receiver_id: Number,
    sender_name: String,
    text: String,
    timestamp: Date
});

export interface MessageDocument extends Document {
    sender_id?: number,
    receiver_id?: number,
    sender_name?: string,
    text?: string,
    timestamp?: Date
}

export const MessageModel = mongoose.model<MessageDocument>('message', MessageSchema);