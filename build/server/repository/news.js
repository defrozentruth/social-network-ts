import path from "path";
import fs from "fs";
import News from "../models/news.js";
import { __data_dir } from "../config.js";
import { Error } from "../types/error.js";
export default class NewsRepository {
    static SAVE_FILENAME = path.join(__data_dir, 'news-repository.json');
    news = new Map();
    static id;
    constructor() {
        this.load();
    }
    async getAllNews() {
        return [...this.news.values()].flat();
    }
    getNewsByAuthorId = async (id) => {
        if (!this.news.has(id)) {
            throw new Error(404, `User with id ${id} does not exist`);
        }
        return [...this.news.get(id)];
    };
    getNews = async (ids) => {
        let news = [];
        for (const id of ids) {
            if (!this.news.has(id)) {
                continue;
            }
            const buf = await this.getNewsByAuthorId(id);
            news.push(...buf);
        }
        return news.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };
    load() {
        if (!fs.existsSync(NewsRepository.SAVE_FILENAME)) {
            console.warn(`[NewsRepository] Storage file ${NewsRepository.SAVE_FILENAME} is not found`);
            return;
        }
        const buf = fs.readFileSync(NewsRepository.SAVE_FILENAME);
        const news = JSON.parse(buf.toString());
        NewsRepository.id = news.length;
        for (let NewsObj of news) {
            const news = News.fromObject(NewsObj);
            this.news.get(news.author_id) ?
                this.news.get(news.author_id)?.push(news) :
                this.news.set(news.author_id, [news]);
        }
        console.info(`[NewsRepository] Data loaded`);
    }
    async save() {
        const json = [];
        for (const News of this.news.values()) {
            json.push(JSON.stringify(News));
        }
        const data = JSON.stringify(json);
        if (!fs.existsSync(path.dirname(NewsRepository.SAVE_FILENAME))) {
            fs.mkdirSync(path.dirname(NewsRepository.SAVE_FILENAME));
            console.log(`[NewsRepository] Created directory ${path.dirname(NewsRepository.SAVE_FILENAME)}`);
        }
        fs.writeFile(NewsRepository.SAVE_FILENAME, data, (err) => {
            if (err) {
                console.warn(`[NewsRepository] Failed to save News to ${NewsRepository.SAVE_FILENAME}`);
                throw err;
            }
            console.log(`[NewsRepository] Saved News to ${NewsRepository.SAVE_FILENAME}`);
        });
    }
}
//# sourceMappingURL=news.js.map