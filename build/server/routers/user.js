import e from"express";export default class UserRouter{controller;constructor(t){this.controller=t}getRouter(){var t=e.Router();return t.get("/",this.controller.getAll),t.get("/:id(\\d+)",this.controller.getById),t.post("/",this.controller.create),t.put("/:id(\\d+)",this.controller.update),t.delete("/:id(\\d+)",this.controller.delete),t}}
//# sourceMappingURL=user.js.map
