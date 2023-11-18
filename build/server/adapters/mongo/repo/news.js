import News from "../../../models/news.js";
import { NewsModel } from "../../../adapters/mongo/schema/news.js";
export default class MongoNewsRepository {
    async getAllNews() {
        const newsDocs = await NewsModel.find().exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc));
        return newsDocs;
    }
    async getNewsByAuthorId(id) {
        const newsDocs = await NewsModel.find({ author_id: id }).exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc));
        return newsDocs;
    }
    async getNews(ids) {
        const newsDocs = await NewsModel.find({ author_id: { $in: ids } }).sort('date').exec();
        newsDocs.map((newsDoc) => News.NewsDocumentToNews(newsDoc));
        return newsDocs;
    }
    async create(news) {
        const newsDoc = new NewsModel(news);
        await newsDoc.save();
        return News.NewsDocumentToNews(newsDoc);
    }
    async delete(id) {
        const result = await NewsModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }
    async getCountNews() {
        const lastDoc = await NewsModel.findOne({}).sort({ $natural: -1 }).exec();
        return lastDoc?.id;
    }
}
//# sourceMappingURL=news.js.map