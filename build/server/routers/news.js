import e from "express";
export default class NewsRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/:id(\\d+)', this.controller.getNewsByAuthorId);
        router.get('/', this.controller.getAllNews);
        router.get('/feed/:id(\\d+)', this.controller.getNews);
        router.post('/', this.controller.createNews);
        router.delete('/:id(\\d+)', this.controller.delete);
        return router;
    }
}
//# sourceMappingURL=news.js.map