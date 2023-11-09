import mongoose, {Document, Schema} from "mongoose";

const NewsSchema = new Schema({
    id: Number,
    author_id: Number,
    author_name: String,
    content: String,
    date: Date
});

export interface NewsDocument extends Document {
    id: number,
    author_id?: number,
    author_name?: string,
    content?: string,
    date?: Date
}

export const NewsModel = mongoose.model<NewsDocument>('news', NewsSchema);