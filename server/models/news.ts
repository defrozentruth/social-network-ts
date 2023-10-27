export default class News{
    constructor(
        public id: number = 1,
        public author_id?: number,
        public content?: string,
        public date?: Date
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new News(), obj)
    }
}