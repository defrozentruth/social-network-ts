import validator from "validator";
export { User, STATUS, ROLE };
const STATUS = [
    'active',
    'inactive',
    'unverified',
    'blocked'
];
const ROLE = ['admin', 'user'];
class User {
    id;
    name;
    email;
    date;
    status;
    role;
    friends;
    constructor(id, name, email, date, status = "unverified", role, friends) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.date = date;
        this.status = status;
        this.role = role;
        this.friends = friends;
    }
    static fromObject(obj) {
        return Object.assign(new User(), obj);
    }
    static userDocumentToUser(userDoc) {
        return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.date, userDoc.status, userDoc.role, userDoc.friends);
    }
    isValid = () => {
        return (validator.isEmail(this.email)) &&
            (validator.isInt(this.id.toString())) &&
            (this.name.length > 0) &&
            (validator.isIn(this.status, STATUS)) &&
            (validator.isIn(this.role, ROLE));
    };
}
//# sourceMappingURL=user.js.map