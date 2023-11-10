import {User} from "../models/user";

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