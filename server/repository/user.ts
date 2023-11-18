import {User} from "../models/user";
import path from "path";
import {__data_dir} from "../config.js";
import {User} from "../models/user.js";
import {Error} from "../types/error.js"
import fs from "fs";

export default interface UserRepository {
    getById(id: number): Promise<User>;
    getUsers(ids?: number[]): Promise<User[]>;
    create(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    delete(id: number): Promise<boolean>;
    getFriendsById(id: number): Promise<User[]>;
    getCountUsers(): Promise<number>
    addFriend(id: number, friendId: number): Promise<User>
    deleteFriend(id: number, friendId: number): Promise<User>
}