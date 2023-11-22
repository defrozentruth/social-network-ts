import path from "path";
import { __data_dir } from "../config.js";
import { User } from "../models/user.js";
import { Error } from "../types/error.js";
import fs from "fs";
export default class UserRepository {
    static SAVE_FILENAME = path.join(__data_dir, 'user-repository.json');
    users = new Map();
    static id;
    constructor() {
        this.load();
    }
    getById = async (id) => {
        if (!this.users.has(id)) {
            throw new Error(404, `User with id ${id} does not exist`);
        }
        return this.users.get(id);
    };
    async getUsers(ids) {
        if (ids === undefined) {
            return [...this.users.values()];
        }
        else {
            return ids
                .filter((id) => this.users.has(Number(id)))
                .map((id) => this.users.get(Number(id)));
        }
    }
    async create(user) {
        if (!user.isValid()) {
            throw new Error(400, 'Invalid Request Body');
        }
        user.id = UserRepository.id++;
        this.users?.set(user.id, user);
        console.info(`[UserRepository] User created: ${user.name}`);
        await this.save();
        return user;
    }
    async update(id, user) {
        if (!user.isValid()) {
            throw new Error(400, `Bad Request`);
        }
        if (!this.users?.has(id)) {
            throw new Error(404, `User with ID ${id} is not found`);
        }
        const oldUser = this.users.get(id);
        user.id = user.id ?? oldUser.id;
        user.name = user.name ?? oldUser.name;
        user.email = user.email ?? oldUser.email;
        user.date = user.date ?? oldUser.date;
        user.status = user.status ?? oldUser.status;
        user.role = user.role ?? oldUser.role;
        user.friends = user.friends ?? oldUser.friends;
        this.users?.set(id, user);
        console.info(`[UserRepository] User edited: ${user.name}`);
        await this.save();
        return user;
    }
    async delete(id) {
        if (!this.users?.has(id)) {
            throw new Error(404, `User with ID ${id} is not found`);
        }
        this.users?.delete(id);
        await this.save();
        return true;
    }
    async getFriendsById(id) {
        if (!this.users.has(id)) {
            throw new Error(404, `User with id ${id} does not exist`);
        }
        const friends_ids = this.users.get(id).friends;
        if (!friends_ids) {
            throw new Error(404, 'Friends not found');
        }
        let friends = [];
        for (const elem of friends_ids) {
            if (this.users.has(elem)) {
                friends.push(this.users.get(elem));
            }
        }
        return friends;
    }
    load() {
        if (!fs.existsSync(UserRepository.SAVE_FILENAME)) {
            console.warn(`[UserRepository] Storage file ${UserRepository.SAVE_FILENAME} is not found`);
            return;
        }
        const buf = fs.readFileSync(UserRepository.SAVE_FILENAME);
        const users = JSON.parse(buf.toString());
        UserRepository.id = users.length;
        for (let userObj of users) {
            const user = User.fromObject(userObj);
            this.users.set(user.id, user);
        }
        console.info(`[UserRepository] Data loaded`);
    }
    async save() {
        const json = Array.from(this.users.values());
        const data = JSON.stringify(json, null, 2);
        if (!fs.existsSync(path.dirname(UserRepository.SAVE_FILENAME))) {
            fs.mkdirSync(path.dirname(UserRepository.SAVE_FILENAME));
            console.log(`[UserRepository] Created directory ${path.dirname(UserRepository.SAVE_FILENAME)}`);
        }
        fs.writeFileSync(UserRepository.SAVE_FILENAME, data);
        console.log(`[UserRepository] Data saved to ${UserRepository.SAVE_FILENAME}`);
    }
    async getCountUsers() {
        const buf = fs.readFileSync(UserRepository.SAVE_FILENAME);
        const users = JSON.parse(buf.toString());
        return users.length;
    }
}
//# sourceMappingURL=user.js.map