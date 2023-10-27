import e from "express";
import routersPool from "../routers/router-pool.js";

export default (server: e.Express) => {
    server.use('/api/user', routersPool.userRouter);
    server.use('/api/news', routersPool.newsRouter);
    server.use('/api/message', routersPool.messageRouter);
    server.use('/api/friend', routersPool.friendRouter);

    server.use('/api', errorHandler);
};

function errorHandler(err: any, req: e.Request, res: e.Response, next: e.NextFunction) {
    console.error(err.message)
    let status = err.code || 500
    res.status(status).send(status === 500 ? 'Internal server error' : err.message)
}