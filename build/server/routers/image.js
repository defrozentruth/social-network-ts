import e from "express";
import upload from "./../middleware/multer.js";
export default class ImageRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/:id(\\d+)', this.controller.getImageById);
        router.delete('/:id(\\d+)', this.controller.deleteImage);
        router.post('/:id(\\d+)', upload.single('image'), this.controller.updateImage);
        return router;
    }
}
//# sourceMappingURL=image.js.map