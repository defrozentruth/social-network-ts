import e from "express";
import ImageController from "../controllers/image";
import upload from "./../middleware/multer"

export default class ImageRouter{
    constructor(private readonly controller: ImageController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/:id(\\d+)', this.controller.getImageById);
        router.delete('/:id(\\d+)', this.controller.deleteImage);
        router.post('/:id(\\d+)', upload.single('image'), this.controller.updateImage)
        return router
    }
}