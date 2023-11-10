import {ImageDocument} from "../adapters/mongo/schema/image";

export default class Image{
    constructor(
       public user_id?: number,
       public image_url?: string,
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new Image(), obj)
    }

    static ImageDocumentToImage(imageDoc: ImageDocument){
        return new Image(
            imageDoc.user_id,
            imageDoc.image_url,
        )
    }
}