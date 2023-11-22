import e from "express";
export default class NewsRouter {
    controller;
    feedController;
    constructor(controller, feedController) {
        this.controller = controller;
        this.feedController = feedController;
    }
    getRouter() {
        const router = e.Router();
        router.get('/', this.controller.getAllNews);
        router.get('/:id(\\d+)', this.feedController.getNewsFeed);
        return router;
    }
}
//# sourceMappingURL=news.js.map