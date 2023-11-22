import Image from "../models/image.js";
import path from "path";
import { __data_dir } from "../config.js";
import { Error } from "../types/error.js";
import fs from "fs";
export default class ImageRepository {
    static SAVE_FILENAME = path.join(__data_dir, 'image-repository.json');
    images = new Map();
    static id;
    constructor() {
        this.load();
    }
    getImageByUserId = async (id) => {
        if (!this.images.has(id)) {
            throw new Error(404, `Image with id ${id} does not exist`);
        }
        return this.images.get(id);
    };
    async getImages(ids) {
        if (ids === undefined) {
            return [...this.images.values()];
        }
        else {
            return ids
                .filter((id) => this.images.has(Number(id)))
                .map((id) => this.images.get(Number(id)));
        }
    }
    async create(image) {
        image.id = ImageRepository.id++;
        this.images?.set(image.id, image);
        console.info(`[ImageRepository] Image created: ${image.url}`);
        await this.save();
        return image;
    }
    async updateUserImage(id, image) {
        if (!this.images?.has(id)) {
            throw new Error(404, `Image with ID ${id} is not found`);
        }
        const oldImage = this.images.get(id);
        image.id = image.id ?? oldImage.id;
        image.url = image.url ?? oldImage.url;
        this.images?.set(id, image);
        console.info(`[ImageRepository] Image edited: ${image.url}`);
        await this.save();
        return image;
    }
    async deleteUserImage(id) {
        if (!this.images?.has(id)) {
            throw new Error(404, `Image with ID ${id} is not found`);
        }
        this.images?.delete(id);
        await this.save();
        return true;
    }
    load() {
        if (!fs.existsSync(ImageRepository.SAVE_FILENAME)) {
            console.warn(`[ImageRepository] Storage file ${ImageRepository.SAVE_FILENAME} is not found`);
            return;
        }
        const buf = fs.readFileSync(ImageRepository.SAVE_FILENAME);
        const images = JSON.parse(buf.toString());
        ImageRepository.id = images.length;
        for (let authObj of images) {
            const image = Image.fromObject(authObj);
            this.images.set(image.id, image);
        }
        console.info(`[ImageRepository] Data loaded`);
    }
    async save() {
        const json = Array.from(this.images.values());
        const data = JSON.stringify(json, null, 2);
        if (!fs.existsSync(path.dirname(ImageRepository.SAVE_FILENAME))) {
            fs.mkdirSync(path.dirname(ImageRepository.SAVE_FILENAME));
            console.log(`[ImageRepository] Created directory ${path.dirname(ImageRepository.SAVE_FILENAME)}`);
        }
        fs.writeFileSync(ImageRepository.SAVE_FILENAME, data);
        console.log(`[ImageRepository] Data saved to ${ImageRepository.SAVE_FILENAME}`);
    }
}
//# sourceMappingURL=image.js.map