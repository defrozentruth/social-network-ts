import e from "express";

export default (err: any, req: e.Request, res: e.Response, next: e.NextFunction) => {
    console.error(err.message)
    let status = err.code || 500
    res.status(status).send(status === 500 ? 'Internal server error' : err.message)
}



