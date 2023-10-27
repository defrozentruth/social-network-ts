import e from "express";
import NewsController from "../controllers/news.js";
import NewsFeedController from "../controllers/news-feed.js";

export default class NewsRouter{
    constructor(private readonly controller: NewsController, private readonly feedController: NewsFeedController) {}
    public getRouter(){
        const router = e.Router()
        // router.get('/:id(\\d+)', this.controller.getNewsByAuthorId);
        router.get('/', this.controller.getAllNews)
        router.get('/:id(\\d+)', this.feedController.getNewsFeed)
        return router
    }
}