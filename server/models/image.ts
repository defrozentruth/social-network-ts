export const DEFAULT_URL = "http://localhost:8080/img/placeholder.png"

export default class Image{
    constructor(
        public id?: number,
        public url?: string,
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new Image(), obj)
    }
}