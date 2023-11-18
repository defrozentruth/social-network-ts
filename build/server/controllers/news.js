import repositoryPool from "../repository/repository-pool.js";
import News from "../models/news.js";
import { getIo } from "../socket.js";
import * as Sentry from "@sentry/node";
export default class NewsController {
    newsRepository;
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    getAllNews = async (req, res) => {
        try {
            const news = await this.newsRepository.getAllNews();
            res.status(200).send(JSON.stringify(news));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    getNewsByAuthorId = async (req, res) => {
        try {
            const id = parseInt(req.params["id"]);
            const news = await this.newsRepository.getNewsByAuthorId(id);
            res.status(200).send(JSON.stringify(news));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    getNews = async (req, res) => {
        try {
            const id = parseInt(req.params["id"]);
            const news = await this.newsRepository.getNews(((await repositoryPool.userRepo.getById(id)).friends));
            res.status(200).send(JSON.stringify(news));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    createNews = async (req, res) => {
        try {
            const news = News.fromObject(req.body);
            news.id = (await this.newsRepository.getCountNews()) + 1;
            const createdNews = await this.newsRepository.create(news);
            getIo().emit('feed', JSON.stringify(createdNews));
        }
        catch (e) {
            Sentry.captureException(e);
            res.status(400).json({ error: e.message });
        }
    };
    delete = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const success = await this.newsRepository.delete(id);
            res.json({ success });
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
}
//# sourceMappingURL=news.js.map