import e from "express";
export default class AuthRouter {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    getRouter() {
        const router = e.Router();
        router.post('/login', this.controller.Login);
        router.post('/register', this.controller.SignUp);
        return router;
    }
}
//# sourceMappingURL=auth.js.map