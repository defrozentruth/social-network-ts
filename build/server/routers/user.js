import e from "express";
export default class UserRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/', this.controller.getAll);
        router.get('/:id(\\d+)', this.controller.getById);
        router.post('/', this.controller.create);
        router.put('/:id(\\d+)', this.controller.update);
        router.delete('/:id(\\d+)', this.controller.delete);
        return router;
    }
}
//# sourceMappingURL=user.js.map