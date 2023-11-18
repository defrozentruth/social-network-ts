//import {UserDocument} from "../adapters/mongo/schema/user";
import {User} from "~server-src/models/user";

declare global{
    namespace Express{
        interface Request{
            token: any,
            currentUser: User;
        }
    }
}