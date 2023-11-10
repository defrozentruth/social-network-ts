import {UserModel} from "../../../adapters/mongo/schema/user";
import {User} from "../../../models/user";
import UserRepository from "../../../repository/user";

export default class MongoUserRepository implements UserRepository{

    async getById(id: number): Promise<User> {
        const userDoc = await UserModel.findOne({ id }).exec();
        if (!userDoc) {
            throw new Error(`User with ID ${id} not found.`);
        }
        return User.userDocumentToUser(userDoc);
    }

    async getUsers(ids?: number[]): Promise<User[]> {
        let query = UserModel.find();
        if (ids) {
            query = query.where('id').in(ids);
        }
        const userDocs = await query.exec();
        return userDocs.map((userDoc) => User.userDocumentToUser(userDoc));
    }

    async create(user: User): Promise<User> {
        const userDoc = new UserModel(user);
        await userDoc.save();
        return User.userDocumentToUser(userDoc);
    }

    async update(id: number, user: User): Promise<User> {
        const userDoc = await UserModel.findOneAndUpdate({ id }, user, { new: true }).exec();
        if (!userDoc) {
            throw new Error(`User with ID ${id} not found.`);
        }
        return User.userDocumentToUser(userDoc);
    }

    async delete(id: number): Promise<boolean> {
        const result = await UserModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }

    async getFriendsById(id: number): Promise<User[]> {
        const user = await this.getById(id);
        return await this.getUsers(user.friends);
    }

    async getCountUsers(): Promise<number> {
        return await UserModel.countDocuments({}).exec()
    }

    async addFriend(id: number, friendId: number): Promise<User>{
        const user = await UserModel.findOne({id: id}).exec()

        if(!user){
            throw new Error(`User with id ${id} not found`)
        }

        const friend = await UserModel.findOne({id: friendId}).exec();

        if(!friend){
            throw new Error(`Invalid friend Id`)
        }

        if(!user.friends?.includes(friendId)){
            user.friends?.push(friendId)
            friend.friends?.push(id)
            await this.update(friend.id, User.userDocumentToUser(friend))
            return await this.update(user.id, User.userDocumentToUser(user))
        }
        return User.userDocumentToUser(user)
    }

    async deleteFriend(id: number, friendId: number): Promise<User>{
        const user = await UserModel.findOne({id: id}).exec()

        if(!user){
            throw new Error(`User with id ${id} not found`)
        }

        const friend = await UserModel.findOne({id: friendId}).exec();

        if(!friend){
            throw new Error(`Invalid friend Id`)
        }

        if(!user.friends?.includes(friendId)){
            throw new Error(`Friend with Id ${friendId} doesn't exist in user with id ${id}`)
        }
        user.friends.splice(user.friends.indexOf(friendId), 1)
        friend.friends?.splice(friend.friends.indexOf(id), 1)
        await this.update(friend.id, User.userDocumentToUser(friend))
        return await this.update(user.id, User.userDocumentToUser(user))
    }

}