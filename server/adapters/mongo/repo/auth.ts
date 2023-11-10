import AuthRepository from "../../../repository/auth";
import AuthData from "../../../models/auth";
import {AuthModel} from "../schema/auth";

export default class MongoAuthRepository implements AuthRepository{
    public async create(authData: AuthData){
        const authDoc = new AuthModel(authData);
        await authDoc.save();
        return {
            id: authDoc.id,
            email: authDoc.email
        } as Partial<AuthData>
    }

    public async getUserByEmail(email:string){
        const authDoc = await AuthModel.findOne({email: email}).exec();
        if (authDoc){
            return AuthData.AuthFromAuthDocument(authDoc)
        }else{
            throw new Error(`User with email ${email} not found`)
        }
    }
}