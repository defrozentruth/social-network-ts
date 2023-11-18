import e from "express";
export default class FriendRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/:id(\\d+)', this.controller.getFriendsByUserId);
        router.post('/:id(\\d+)/:friendId(\\d+)', this.controller.addFriend);
        router.delete('/:id(\\d+)/:friendId(\\d+)', this.controller.deleteFriend);
        return router;
    }
}
//# sourceMappingURL=friend.js.map