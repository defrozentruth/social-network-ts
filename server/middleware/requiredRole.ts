import e from "express";

export default (requiredRole: string) => {
    return (req: e.Request, res: e.Response, next: e.NextFunction) => {
        if (req.currentUser.role === requiredRole) {
            return next();
        } else {
            return res.status(401).send('Action not allowed');
        }
    }
}