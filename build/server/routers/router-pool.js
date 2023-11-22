import UserRouter from "./user.js";
import NewsRouter from "./news.js";
import MessageRouter from "./message.js";
import controllerPool from "../controllers/controller-pool.js";
import FriendRouter from "./friend.js";
import AuthRouter from "../routers/auth.js";
import ImageRouter from "../routers/image.js";
export default {
    userRouter: new UserRouter(controllerPool.userController).getRouter(),
    newsRouter: new NewsRouter(controllerPool.newsController, controllerPool.newsFeedController).getRouter(),
    messageRouter: new MessageRouter(controllerPool.messageController).getRouter(),
    friendRouter: new FriendRouter(controllerPool.userController).getRouter(),
    authRouter: new AuthRouter(controllerPool.authController).getRouter(),
    imageRouter: new ImageRouter(controllerPool.imageController).getRouter(),
};
//# sourceMappingURL=router-pool.js.map