import e from "express";
export default class MessageRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.get('/:id(\\d+)', this.controller.getChats);
        router.get('/:id(\\d+)/:friend_id(\\d+)', this.controller.getMessagesInChat);
        router.post('/:id(\\d+)/:friendId(\\d+)', this.controller.createMessage);
        return router;
    }
}
//# sourceMappingURL=message.js.map