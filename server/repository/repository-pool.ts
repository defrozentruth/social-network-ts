import MongoUserRepository from "../adapters/mongo/repo/user.js";
import MongoMessageRepository from "../adapters/mongo/repo/message.js";
import MongoNewsRepository from "../adapters/mongo/repo/news.js";
import MongoAuthRepository from "../adapters/mongo/repo/auth.js";

export default {
    userRepo: new MongoUserRepository(),
    newsRepo: new MongoNewsRepository(),
    messageRepo: new MongoMessageRepository(),
    authRepo: new MongoAuthRepository()
}