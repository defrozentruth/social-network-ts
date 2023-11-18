//import {AuthDocument} from "../adapters/mongo/schema/auth.js";
export default class AuthData{
    constructor(
       public id?: number,
       public email?: string,
       public password?: string
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new AuthData(), obj)
    }

    // static AuthFromAuthDocument(authDoc: AuthDocument){
    //     return new AuthData(
    //         authDoc.id,
    //         authDoc.email,
    //         authDoc.password,
    //     )
    // }
}