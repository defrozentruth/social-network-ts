import Image from "../models/image.js";
import { getIo } from "../socket.js";
import { DEFAULT_URL } from "../models/image.js";
import * as Sentry from "@sentry/node";
export default class ImageController {
    imageRepository;
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
    }
    getImageById = async (req, res) => {
        try {
            const id = parseInt(req.params['id']);
            const image = await this.imageRepository.getImageByUserId(id);
            res.status(200).send(JSON.stringify(image));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(200).send(JSON.stringify({ image_url: DEFAULT_URL }));
        }
    };
    deleteImage = async (req, res) => {
        try {
            const id = parseInt(req.params['id']);
            const result = await this.imageRepository.deleteUserImage(id);
            getIo().emit('image');
            res.json({ result });
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    updateImage = async (req, res) => {
        try {
            const file = req.file;
            const newImage = new Image(parseInt(req.params['id']), `http://localhost:8080/img/${file.filename}`);
            const image = await this.imageRepository.updateUserImage(parseInt(req.params['id']), newImage);
            getIo().emit('image');
            res.status(200).send(JSON.stringify(image));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
}
//# sourceMappingURL=image.js.map