import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    date: Date,
    status: String,
    role: String,
    friends: [Number],
});
export const UserModel = mongoose.model('user', userSchema);
//# sourceMappingURL=user.js.map