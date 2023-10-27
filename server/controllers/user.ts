import UserRepository from "../repository/user.js";
import e from "express";
import {User} from "../models/user.js";

export default class UserController {

    constructor(private userRepository: UserRepository) {}

    public getById = async (req: e.Request, res: e.Response) => {
        try {
            const id = Number(req.params["id"]);
            const user = await this.userRepository.getById(id);
            res.status(200).send(JSON.stringify(user));
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    public getAll = async (req: e.Request, res: e.Response) => {
        try {
            const ids = req.query["ids"] ? (req.query["ids"] as string).split(',').map(Number) : undefined;
            const users = await this.userRepository.getUsers(ids);
            res.status(200).send(JSON.stringify(users));
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    public create = async (req: e.Request, res: e.Response) => {
        try {
            const user = User.fromObject(req.body); // Предполагается, что вы передаете данные пользователя в теле запроса
            const createdUser = await this.userRepository.create(user);
            res.status(201).send(JSON.stringify(createdUser));
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    public update = async (req: e.Request, res: e.Response) => {
        try {
            const id = Number(req.body["id"]);
            const user = new User(id, req.body["name"], req.body['email'], req.body['date'], req.body['status'], req.body['role']);
            const updatedUser = await this.userRepository.update(id, user);
            res.status(200).send(JSON.stringify(updatedUser));
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    public delete = async (req: e.Request, res: e.Response) => {
        try {
            const id = Number(req.params["id"]);
            const success = await this.userRepository.delete(id);
            res.json({ success });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    public getFriendsByUserId = async (req: e.Request, res: e.Response) => {
        try {
            const id = Number(req.params["id"]);
            const friends = await this.userRepository.getFriendsById(id);
            res.status(200).send(JSON.stringify(friends));
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    };
}