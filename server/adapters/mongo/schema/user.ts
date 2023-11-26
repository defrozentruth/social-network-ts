import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
    id: Number, // Определяйте соответствие полей
    name: String,
    email: String,
    date: Date,
    status: String,
    role: String,
    friends: [Number],
});

export interface UserDocument extends Document {
    id?: number;
    name?: string;
    email?: string;
    date?: Date;
    status?: string;
    role?: string;
    friends?: number[];
}

export const UserModel = mongoose.model<UserDocument>('user', userSchema)