import validator from "validator"
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

    public setStatus = (status: string) => {
        this.status = status;
    }

    public setRole = (role: string) => {
        this.role = role;
    }

    public isValid = () => {
        return (validator.isEmail(this.email!)) &&
            (validator.isInt(this.id!.toString())) &&
            (this.name!.length > 0) &&
            (validator.isIn(this.status, STATUS)) &&
            (validator.isIn(this.role!, ROLE));
    }
}