import UserRepository from "./user.js";
import NewsRepository from "./news.js";
import MessageRepository from "./message.js";

export default {
    userRepo: new UserRepository(),
    newsRepo: new NewsRepository(),
    messageRepo: new MessageRepository(),
}