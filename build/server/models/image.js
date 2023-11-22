export const DEFAULT_URL = "http://localhost:8080/img/placeholder.png";
export default class Image {
    id;
    url;
    constructor(id, url) {
        this.id = id;
        this.url = url;
    }
    static fromObject(obj) {
        return Object.assign(new Image(), obj);
    }
}
//# sourceMappingURL=image.js.map