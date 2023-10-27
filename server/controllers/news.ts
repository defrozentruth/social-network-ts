import NewsRepository from "../repository/news.js";
import e from "express";

export default class NewsController {

    constructor(private newsRepository: NewsRepository) {}

    public getAllNews = async (req: e.Request, res: e.Response) => {
        try {
            const news = await this.newsRepository.getAllNews();
            res.status(200).send(JSON.stringify(news));
        } catch (error:any) {
            res.status(404).json({ error: error.message });
        }
    };

    public getNewsByAuthorId = async (req: e.Request, res: e.Response) => {
        try {
            const id = parseInt(req.params["id"]);
            const news = await this.newsRepository.getNewsByAuthorId(id);
            res.status(200).send(JSON.stringify(news));
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };
}