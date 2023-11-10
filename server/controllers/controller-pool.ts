import UserController from "./user";
import NewsController from "./news";
import MessageController from "./message";
import repositoryPool from "../repository/repository-pool";
import NewsFeedController from "./news-feed";
import {AuthController} from "./auth";
import ImageController from "./image";

export default {
    userController: new UserController(repositoryPool.userRepo),
    newsController: new NewsController(repositoryPool.newsRepo),
    messageController: new MessageController(repositoryPool.messageRepo),
    newsFeedController: new NewsFeedController(repositoryPool.newsRepo, repositoryPool.userRepo),
    authController: new AuthController(repositoryPool.userRepo, repositoryPool.authRepo),
    imageController: new ImageController(repositoryPool.imageRepo)
}