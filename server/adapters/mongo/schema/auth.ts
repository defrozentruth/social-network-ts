import mongoose, { Document, Schema } from 'mongoose';

const AuthSchema = new Schema({
    id: Number,
    email: String,
    password: String,
});

export interface AuthDocument extends Document {
    id: number,
    email: string,
    password: string,
}

export const AuthModel = mongoose.model<AuthDocument>('authentication', AuthSchema);