import {UserDocument} from "../adapters/mongo/schema/user";

declare global{
    namespace Express{
        interface Request{
            token: any,
            currentUser: UserDocument,
        }
    }
}