import NewsRepository from "../../../repository/news";
import News from "../../../models/news";
import {NewsModel} from "../../../adapters/mongo/schema/news";

export default class MongoNewsRepository implements NewsRepository{
    async getAllNews(): Promise<News[]> {
        const newsDocs= await NewsModel.find().exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc))
        return newsDocs
    }

    async getNewsByAuthorId(id: number): Promise<News[]> {
        const newsDocs = await NewsModel.find({ author_id: id }).exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc))
        return newsDocs
    }

    async getNews(ids: number[]): Promise<News[]> {
        const newsDocs = await NewsModel.find({ author_id: { $in: ids } }).sort('date').exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc))
        return newsDocs
    }

    async create(news: News): Promise<News>{
        const newsDoc = new NewsModel(news);
        await newsDoc.save();
        return News.NewsDocumentToNews(newsDoc);
    }

    async delete(id: number): Promise<boolean>{
        const result = await NewsModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }

    async getCountNews(): Promise<number> {
        const lastDoc = await NewsModel.findOne({}).sort({$natural: -1}).exec()
        return lastDoc?.id
    }
}