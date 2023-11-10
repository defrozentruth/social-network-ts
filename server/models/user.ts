import validator from "validator"
import {UserDocument} from "~server-src/adapters/mongo/schema/user";
export {User, STATUS, ROLE}

const STATUS = [
    'active',
    'inactive',
    'unverified',
    'blocked'
]

const ROLE = ['admin', 'user']

class User{
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public date?: Date,
        public status: string = "unverified",
        public role?: string,
        public friends?: number[]
    ) {}

    static fromObject(obj: Object){
        return Object.assign(new User(), obj)
    }

    static userDocumentToUser(userDoc: UserDocument): User {
        return new User(
            userDoc.id,
            userDoc.name,
            userDoc.email,
            userDoc.date,
            userDoc.status,
            userDoc.role,
            userDoc.friends
        );
    }

    public isValid = () => {
        return (validator.isEmail(this.email!)) &&
            (validator.isInt(this.id!.toString())) &&
            (this.name!.length > 0) &&
            (validator.isIn(this.status, STATUS)) &&
            (validator.isIn(this.role!, ROLE));
    }
}