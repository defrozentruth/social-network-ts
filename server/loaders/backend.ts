import e from "express";
import routersPool from "../routers/router-pool.js";
import errorHandler from "../middleware/errorHandling.js";

export default (server: e.Express) => {
    server.use('/api/user', routersPool.userRouter);
    server.use('/api/news', routersPool.newsRouter);
    server.use('/api/message', routersPool.messageRouter);
    server.use('/api/friend', routersPool.friendRouter);
    server.use('/api/auth', routersPool.authRouter)

    server.use('/api', errorHandler);
};
