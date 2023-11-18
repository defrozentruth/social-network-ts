import { User } from "../models/user.js";
import { getIo } from "../socket.js";
import * as Sentry from "@sentry/node";
export default class UserController {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getById = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const user = await this.userRepository.getById(id);
            res.status(200).send(JSON.stringify(user));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    getAll = async (req, res) => {
        try {
            const ids = req.query["ids"] ? req.query["ids"].split(',').map(Number) : undefined;
            const users = await this.userRepository.getUsers(ids);
            res.status(200).send(JSON.stringify(users));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(404).json({ error: error.message });
        }
    };
    create = async (req, res) => {
        try {
            const user = User.fromObject(req.body);
            const createdUser = await this.userRepository.create(user);
            res.status(201).send(JSON.stringify(createdUser));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            const id = Number(req.body["id"]);
            const user = new User(id, req.body["name"], req.body['email'], req.body['date'], req.body['status'], req.body['role']);
            const updatedUser = await this.userRepository.update(id, user);
            res.status(200).send(JSON.stringify(updatedUser));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const success = await this.userRepository.delete(id);
            res.json({ success });
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    getFriendsByUserId = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const friends = await this.userRepository.getFriendsById(id);
            res.status(200).send(JSON.stringify(friends));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    addFriend = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const friendId = Number(req.params["friendId"]);
            const result = await this.userRepository.addFriend(id, friendId);
            res.status(200).json(result);
            getIo().emit('friend', JSON.stringify(result));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
    deleteFriend = async (req, res) => {
        try {
            const id = Number(req.params["id"]);
            const friendId = Number(req.params["friendId"]);
            const success = await this.userRepository.deleteFriend(id, friendId);
            res.status(200).json(success);
            getIo().emit('friend', JSON.stringify(success));
        }
        catch (error) {
            Sentry.captureException(error);
            res.status(400).json({ error: error.message });
        }
    };
}
//# sourceMappingURL=user.js.map