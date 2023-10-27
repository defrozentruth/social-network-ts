import UserRouter from "./user.js";
import NewsRouter from "./news.js";
import MessageRouter from "./message.js";
import controllerPool from "../controllers/controller-pool.js";
import FriendRouter from "./friend.js";

export default {
    userRouter: new UserRouter(controllerPool.userController).getRouter(),
    newsRouter: new NewsRouter(controllerPool.newsController, controllerPool.newsFeedController).getRouter(),
    messageRouter: new MessageRouter(controllerPool.messageController).getRouter(),
    friendRouter: new FriendRouter(controllerPool.userController).getRouter()
}