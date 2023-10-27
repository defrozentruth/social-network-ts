import path from "path";
import fs from "fs";
import {Error} from "../types/error.js";
import Message from "../models/message.js";
import {__data_dir} from "../config.js";

export default class MessageRepository{
    private static readonly SAVE_FILENAME = path.join(__data_dir, 'message-repository.json');
    protected messages = new Map<string, Message[]>()
    private static id: number;

    constructor() {
        this.load()
    }

    public async getMessagesInChat(user_id: number, friend_id: number): Promise<void|Message[]>{
        const key = [user_id, friend_id].sort().join('-')
        if(!this.messages.has(key)){
            throw new Error(404, `Chat between id ${user_id} and ${friend_id} does not exist`);
        }
        return this.messages.get(key)
    }

    public async getChats(user_id: number): Promise<void|number[]>{
        let chats: number[] = []
        for(const elem of this.messages.keys()){
            if(elem.includes(user_id.toString())){
                const users = elem.split('-').map(elem => parseInt(elem))
                chats.push(...users.filter(elem => elem != user_id))
            }
        }
        return chats
    }

    public async getUserChats(user_id: number) {
        const chats = await this.getChats(user_id)
        if(!chats){
            throw new Error(404, 'Chats not found')
        }
        let result = []
        for(const elem of chats){
            const buf = await this.getMessagesInChat(user_id, elem)
            if(buf){
                result.push(buf)
            }
        }
        return result
    }

    private load(){
        if(!fs.existsSync(MessageRepository.SAVE_FILENAME)){
            console.warn(`[MessageRepository] Storage file ${MessageRepository.SAVE_FILENAME} is not found`)
            return;
        }

        const buf = fs.readFileSync(MessageRepository.SAVE_FILENAME)
        const messages = JSON.parse(buf.toString())

        for(const messageObj of messages){
            const message = Message.fromObject(messageObj)
            const key = [message.receiver_id, message.sender_id].sort().join('-')
            if(!this.messages.has(key)){
                this.messages.set(key, [message])
            }else{
                this.messages.get(key)?.push(message)
            }
        }

        console.info(`[MessageRepository] Data loaded`)
    }
}