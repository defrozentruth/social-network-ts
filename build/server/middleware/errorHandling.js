export default (err, req, res, next) => {
    console.error(err.message);
    let status = err.code || 500;
    res.status(status).send(status === 500 ? 'Internal server error' : err.message);
};
//# sourceMappingURL=errorHandling.js.map