import UserController from "./user.js";
import NewsController from "./news.js";
import MessageController from "./message.js";
import repositoryPool from "../repository/repository-pool.js";
import NewsFeedController from "./news-feed.js";
import {AuthController} from "./auth.js";

export default {
    userController: new UserController(repositoryPool.userRepo),
    newsController: new NewsController(repositoryPool.newsRepo),
    messageController: new MessageController(repositoryPool.messageRepo),
    newsFeedController: new NewsFeedController(repositoryPool.newsRepo, repositoryPool.userRepo),
    authController: new AuthController(repositoryPool.userRepo, repositoryPool.authRepo)
}