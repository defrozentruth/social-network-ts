export default class News {
    id;
    author_id;
    author_name;
    content;
    date;
    constructor(id = 1, author_id, author_name, content, date) {
        this.id = id;
        this.author_id = author_id;
        this.author_name = author_name;
        this.content = content;
        this.date = date;
    }
    static fromObject(obj) {
        return Object.assign(new News(), obj);
    }
    static NewsDocumentToNews(newsDoc) {
        return new News(newsDoc.id, newsDoc.author_id, newsDoc.author_name, newsDoc.content, newsDoc.date);
    }
}
//# sourceMappingURL=news.js.map