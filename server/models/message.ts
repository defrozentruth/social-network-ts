export default class Message{
    constructor(
        public sender_id?: number,
        public receiver_id?: number,
        public sender_name?: string,
        public text?: string,
        public timestamp?: Date
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new Message(), obj)
    }
}