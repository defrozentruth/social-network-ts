import mongoose, {Document, Schema} from "mongoose";

const ImageSchema = new Schema({
    user_id: Number,
    image_url: String,
});

export interface ImageDocument extends Document {
    user_id?: number,
    image_url?: string,
}

export const ImageModel = mongoose.model<ImageDocument>('photos', ImageSchema);