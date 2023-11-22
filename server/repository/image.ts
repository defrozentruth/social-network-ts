import Image from "~server-src/models/image";
import path from "path";
import {__data_dir} from "../config.js";
import {Error} from "../types/error.js"
import fs from "fs";

export default class ImageRepository{
    private static readonly SAVE_FILENAME = path.join(__data_dir, 'image-repository.json');

    public images: Map<number, Image> = new Map();
    private static id: number;

    constructor() {
        this.load();
    }

    public getImageByUserId = async (id: number) => {
        if (!this.images.has(id)) {
            throw new Error(404, `Image with id ${id} does not exist`);
        }
        return this.images.get(id)!;
    }

    public async getImages(ids?: number[]): Promise<Image[]> {
        if (ids === undefined) {
            return [...this.images.values()];
        } else {
            return ids
                .filter((id) => this.images.has(Number(id)))
                .map((id) => this.images.get(Number(id))!);
        }
    }

    public async create(image: Image): Promise<Image>{
        image.id = ImageRepository.id++
        this.images?.set(image.id, image)
        console.info(`[ImageRepository] Image created: ${image.url}`)
        await this.save()
        return image;
    }

    public async updateUserImage(id: number, image: Image): Promise<Image>{
        if(!this.images?.has(id)){
            throw new Error(404, `Image with ID ${id} is not found`)
        }

        const oldImage = this.images.get(id)!

        image.id = image.id ?? oldImage.id;
        image.url = image.url ?? oldImage.url

        this.images?.set(id, image);
        console.info(`[ImageRepository] Image edited: ${image.url}`)
        await this.save()
        return image
    }

    public async deleteUserImage(id: number): Promise<Boolean>{
        if(!this.images?.has(id)){
            throw new Error(404, `Image with ID ${id} is not found`)
        }
        this.images?.delete(id)
        await this.save()
        return true
    }

    private load(){
        if(!fs.existsSync(ImageRepository.SAVE_FILENAME)){
            console.warn(`[ImageRepository] Storage file ${ImageRepository.SAVE_FILENAME} is not found`)
            return;
        }

        const buf = fs.readFileSync(ImageRepository.SAVE_FILENAME)
        const images = JSON.parse(buf.toString());
        ImageRepository.id = images.length;

        for (let authObj of images) {
            const image= Image.fromObject(authObj);
            this.images.set(image.id!, image);
        }
        console.info(`[ImageRepository] Data loaded`);
    }

    async save() {
        const json = Array.from(this.images.values()); // Преобразуйте Map в массив объектов пользователей
        const data = JSON.stringify(json, null, 2); // Преобразуйте массив в JSON-строку
        if (!fs.existsSync(path.dirname(ImageRepository.SAVE_FILENAME))) {
            fs.mkdirSync(path.dirname(ImageRepository.SAVE_FILENAME));
            console.log(`[ImageRepository] Created directory ${path.dirname(ImageRepository.SAVE_FILENAME)}`);
        }

        fs.writeFileSync(ImageRepository.SAVE_FILENAME, data);
        console.log(`[ImageRepository] Data saved to ${ImageRepository.SAVE_FILENAME}`);
    }
}