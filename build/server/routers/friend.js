import e from "express";
export default class FriendRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/:id', this.controller.getFriendsByUserId);
        return router;
    }
}
//# sourceMappingURL=friend.js.map