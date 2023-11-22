export default class AuthData {
    id;
    email;
    password;
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static fromObject(obj) {
        return Object.assign(new AuthData(), obj);
    }
}
//# sourceMappingURL=auth.js.map