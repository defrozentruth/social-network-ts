import mongoose, { Schema } from "mongoose";
const ImageSchema = new Schema({
    user_id: Number,
    image_url: String,
});
export const ImageModel = mongoose.model('photos', ImageSchema);
//# sourceMappingURL=image.js.map