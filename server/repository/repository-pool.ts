import MongoUserRepository from "../adapters/mongo/repo/user";
import MongoMessageRepository from "../adapters/mongo/repo/message";
import MongoNewsRepository from "../adapters/mongo/repo/news";
import MongoAuthRepository from "../adapters/mongo/repo/auth";
import MongoImageRepository from "../adapters/mongo/repo/image";

export default {
    userRepo: new MongoUserRepository(),
    newsRepo: new MongoNewsRepository(),
    messageRepo: new MongoMessageRepository(),
    authRepo: new MongoAuthRepository(),
    imageRepo: new MongoImageRepository()
}