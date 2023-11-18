import Image from "../../../models/image.js";
import { ImageModel } from "../schema/image.js";
import fs from "fs";
import { __public_dir } from "../../../config.js";
import path from "path";
export const DEFAULT_URL = "http://localhost:8080/img/default.png";
export default class MongoImageRepository {
    async getImageByUserId(user_id) {
        const imageDoc = await ImageModel.findOne({ user_id }).exec();
        if (!imageDoc) {
            throw new Error(`User with id ${user_id} has no image`);
        }
        return Image.ImageDocumentToImage(imageDoc);
    }
    async updateUserImage(id, image) {
        const oldImage = await ImageModel.findOne({ user_id: id }).exec();
        if (oldImage) {
            const oldFilename = Image.ImageDocumentToImage(oldImage).image_url?.replace(/^.*\/\/[^/]+/, '');
            if (oldFilename) {
                const oldFilePath = path.join(__public_dir, oldFilename);
                fs.existsSync(oldFilePath) && fs.unlinkSync(oldFilePath);
            }
            const updatedImage = await ImageModel.findOneAndUpdate({ user_id: id }, image, { new: true }).exec();
            return updatedImage
                ? Image.ImageDocumentToImage(updatedImage)
                : Image.ImageDocumentToImage(await (new ImageModel(image)).save());
        }
        else {
            return Image.ImageDocumentToImage(await (new ImageModel(image)).save());
        }
    }
    async deleteUserImage(id) {
        const file = await ImageModel.findOne({ user_id: id }).exec();
        if (file) {
            const filename = Image.ImageDocumentToImage(file).image_url?.replace(/^.*\/\/[^/]+/, '');
            if (filename) {
                const filePath = path.join(__public_dir, filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            const result = await ImageModel.deleteOne({ user_id: id }).exec();
            return result.deletedCount === 1;
        }
        return false;
    }
}
//# sourceMappingURL=image.js.map