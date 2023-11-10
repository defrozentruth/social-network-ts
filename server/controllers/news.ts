import NewsRepository from "../repository/news";
import e from "express";
import repositoryPool from "../repository/repository-pool";
import News from "../models/news";
import {getIo} from "../socket";
import * as Sentry from "@sentry/node";

export default class NewsController {

    constructor(private newsRepository: NewsRepository) {}

    public getAllNews = async (req: e.Request, res: e.Response) => {
        try {
            const news = await this.newsRepository.getAllNews();
            res.status(200).send(JSON.stringify(news));
        } catch (error:any) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };

    public getNewsByAuthorId = async (req: e.Request, res: e.Response) => {
        try {
            const id = parseInt(req.params["id"]);
            const news = await this.newsRepository.getNewsByAuthorId(id);
            res.status(200).send(JSON.stringify(news));
        } catch (error: any) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };

    public getNews = async (req: e.Request, res: e.Response) => {
        try {
            const id = parseInt(req.params["id"])
            const news = await this.newsRepository.getNews(((await repositoryPool.userRepo.getById(id)).friends)!)
            res.status(200).send(JSON.stringify(news))
        }catch (error: any){
            Sentry.captureException(error);
            res.status(404).json({error: error.message})
        }
    }

    public createNews = async (req: e.Request, res: e.Response) => {
        try{
            const news = News.fromObject(req.body)
            news.id = (await this.newsRepository.getCountNews()) + 1;
            const createdNews = await this.newsRepository.create(news)
            getIo().emit('feed', JSON.stringify(createdNews))
        }catch (e: any) {
            Sentry.captureException(e);
            res.status(400).json({error: e.message})
        }
    }

    public delete = async (req: e.Request, res: e.Response) => {
        try {
            const id = Number(req.params["id"]);
            const success = await this.newsRepository.delete(id);
            res.json({ success });
        } catch (error: any) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
}