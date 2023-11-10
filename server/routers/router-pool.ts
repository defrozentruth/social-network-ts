import UserRouter from "./user";
import NewsRouter from "./news";
import MessageRouter from "./message";
import controllerPool from "../controllers/controller-pool";
import FriendRouter from "./friend";
import AuthRouter from "./auth";
import ImageRouter from "./image";

export default {
    userRouter: new UserRouter(controllerPool.userController).getRouter(),
    newsRouter: new NewsRouter(controllerPool.newsController).getRouter(),
    messageRouter: new MessageRouter(controllerPool.messageController).getRouter(),
    friendRouter: new FriendRouter(controllerPool.userController).getRouter(),
    authRouter: new AuthRouter(controllerPool.authController).getRouter(),
    imageRouter: new ImageRouter(controllerPool.imageController).getRouter(),
}