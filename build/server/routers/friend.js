import e from"express";export default class FriendRouter{controller;constructor(r){this.controller=r}getRouter(){var r=e.Router();return r.get("/:id",this.controller.getFriendsByUserId),r}}
//# sourceMappingURL=friend.js.map
