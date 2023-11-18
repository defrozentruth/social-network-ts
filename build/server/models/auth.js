export default class AuthData {
    id;
    email;
    password;
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static AuthFromAuthDocument(authDoc) {
        return new AuthData(authDoc.id, authDoc.email, authDoc.password);
    }
}
//# sourceMappingURL=auth.js.map