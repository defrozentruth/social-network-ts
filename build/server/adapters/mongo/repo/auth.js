import AuthData from "../../../models/auth.js";
import { AuthModel } from "../schema/auth.js";
export default class MongoAuthRepository {
    async create(authData) {
        const authDoc = new AuthModel(authData);
        await authDoc.save();
        return {
            id: authDoc.id,
            email: authDoc.email
        };
    }
    async getUserByEmail(email) {
        const authDoc = await AuthModel.findOne({ email: email }).exec();
        if (authDoc) {
            return AuthData.AuthFromAuthDocument(authDoc);
        }
        else {
            throw new Error(`User with email ${email} not found`);
        }
    }
}
//# sourceMappingURL=auth.js.map