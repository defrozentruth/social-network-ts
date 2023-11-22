import UserRepository from "./user.js";
import NewsRepository from "./news.js";
import MessageRepository from "./message.js";
import ImageRepository from "./image.js";
import AuthRepository from "../repository/auth.js";
export default {
    userRepo: new UserRepository(),
    newsRepo: new NewsRepository(),
    messageRepo: new MessageRepository(),
    imageRepo: new ImageRepository(),
    authRepo: new AuthRepository()
};
//# sourceMappingURL=repository-pool.js.map