import e from "express";
import UserController from "../controllers/user";

export default class UserRouter{
    constructor(private readonly controller: UserController) {}
    public getRouter(){
        const router = e.Router()
        router.get('/', this.controller.getAll)
        router.get('/:id(\\d+)', this.controller.getById)
        router.post('/', this.controller.create)
        router.put('/:id(\\d+)', this.controller.update)
        router.delete('/:id(\\d+)', this.controller.delete)
        return router
    }
}