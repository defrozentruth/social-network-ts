import routersPool from "../routers/router-pool.js";
export default (server) => {
    server.use('/api/user', routersPool.userRouter);
    server.use('/api/news', routersPool.newsRouter);
    server.use('/api/message', routersPool.messageRouter);
    server.use('/api/friend', routersPool.friendRouter);
    server.use('/api/auth', routersPool.authRouter);
    server.use('/api/image', routersPool.imageRouter);
    server.use('/api', errorHandler);
};
function errorHandler(err, req, res, next) {
    console.error(err.message);
    let status = err.code || 500;
    res.status(status).send(status === 500 ? 'Internal server error' : err.message);
}
//# sourceMappingURL=backend.js.map