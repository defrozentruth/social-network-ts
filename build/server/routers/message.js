import e from"express";export default class MessageRouter{controller;constructor(e){this.controller=e}getRouter(){var t=e.Router();return t.get("/:id(\\d+)",this.controller.getChats),t.get("/:id(\\d+)/:friend_id(\\d+)",this.controller.getMessagesInChat),t}}
//# sourceMappingURL=message.js.map
