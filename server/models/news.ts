import {NewsDocument} from "~server-src/adapters/mongo/schema/news.js";

export default class News{
    constructor(
        public id: number = 1,
        public author_id?: number,
        public author_name?: string,
        public content?: string,
        public date?: Date
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new News(), obj)
    }

    static NewsDocumentToNews(newsDoc: NewsDocument): News {
        return new News(
            newsDoc.id,
            newsDoc.author_id,
            newsDoc.author_name,
            newsDoc.content,
            newsDoc.date,
        );
    }
}