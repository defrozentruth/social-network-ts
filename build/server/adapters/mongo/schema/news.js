import mongoose, { Schema } from "mongoose";
const NewsSchema = new Schema({
    id: Number,
    author_id: Number,
    author_name: String,
    content: String,
    date: Date
});
export const NewsModel = mongoose.model('news', NewsSchema);
//# sourceMappingURL=news.js.map