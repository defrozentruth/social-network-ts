import path from "path";
import fs from "fs";
import News from "../models/news.js";
import {__data_dir} from "../config.js";
import {Error} from "../types/error.js"

export default class NewsRepository {
    private static readonly SAVE_FILENAME = path.join(__data_dir, 'news-repository.json');

    public news: Map<number, News[]> = new Map();
    private static id: number;

    constructor() {
        this.load();
    }

    public async getAllNews(): Promise<News[]>{
        return [...this.news.values()].flat()
    }

    public getNewsByAuthorId = async (id: number)=> {
        if (!this.news.has(id)) {
            throw new Error(404, `User with id ${id} does not exist`);
        }
        return [...this.news.get(id)!]
    }

    public getNews = async (ids: number[]) =>{
        let news = []
        for(const id of ids){
            if(!this.news.has(id)){
                continue
            }
            const buf = await this.getNewsByAuthorId(id)
            news.push(...buf)
        }
        return news.sort((a:News, b:News) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
    }

    private load(){
        if(!fs.existsSync(NewsRepository.SAVE_FILENAME)){
            console.warn(`[NewsRepository] Storage file ${NewsRepository.SAVE_FILENAME} is not found`)
            return;
        }

        const buf = fs.readFileSync(NewsRepository.SAVE_FILENAME)
        const news = JSON.parse(buf.toString())
        NewsRepository.id = news.length

        for(let NewsObj of news){
            const news = News.fromObject(NewsObj)
            this.news.get(news.author_id!) ?
                this.news.get(<number>news.author_id)?.push(news) :
                this.news.set(<number>news.author_id, [news])
        }
        console.info(`[NewsRepository] Data loaded`)
    }

    public async save(): Promise<void> {
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