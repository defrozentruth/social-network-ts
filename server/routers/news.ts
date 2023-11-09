import e from "express";
import NewsController from "../controllers/news.js";

export default class NewsRouter{
    constructor(private readonly controller: NewsController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/:id(\\d+)', this.controller.getNewsByAuthorId);
        router.get('/', this.controller.getAllNews)
        router.get('/feed/:id(\\d+)', this.controller.getNews)
        router.post('/', this.controller.createNews)
        router.delete('/:id(\\d+)', this.controller.delete)
        return router
    }
}