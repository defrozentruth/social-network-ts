import News from "../models/news";

export default interface NewsRepository {
    getAllNews(): Promise<News[]>;
    getNewsByAuthorId(id: number): Promise<News[]>;
    getNews(ids: number[]): Promise<News[]>;
    create(news: News): Promise<News>;
    delete(id: number): Promise<boolean>;
    getCountNews(): Promise<number>;
}