import mongoose, { Schema } from 'mongoose';
const AuthSchema = new Schema({
    id: Number,
    email: String,
    password: String,
});
export const AuthModel = mongoose.model('authentication', AuthSchema);
//# sourceMappingURL=auth.js.map