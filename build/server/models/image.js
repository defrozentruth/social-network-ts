export default class Image {
    user_id;
    image_url;
    constructor(user_id, image_url) {
        this.user_id = user_id;
        this.image_url = image_url;
    }
    static fromObject(obj) {
        return Object.assign(new Image(), obj);
    }
    static ImageDocumentToImage(imageDoc) {
        return new Image(imageDoc.user_id, imageDoc.image_url);
    }
}
//# sourceMappingURL=image.js.map