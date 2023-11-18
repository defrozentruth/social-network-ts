import e from"express";export default class NewsRouter{controller;feedController;constructor(e,r){this.controller=e,this.feedController=r}getRouter(){var r=e.Router();return r.get("/",this.controller.getAllNews),r.get("/:id(\\d+)",this.feedController.getNewsFeed),r}}
//# sourceMappingURL=news.js.map
