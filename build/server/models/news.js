export default class News {
    id;
    author_id;
    content;
    date;
    constructor(id = 1, author_id, content, date) {
        this.id = id;
        this.author_id = author_id;
        this.content = content;
        this.date = date;
    }
    static fromObject(obj) {
        return Object.assign(new News(), obj);
    }
}
//# sourceMappingURL=news.js.map