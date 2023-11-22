import AuthData from "../models/auth.js";
import path from "path";
import { __data_dir } from "../config.js";
import { Error } from "../types/error.js";
import fs from "fs";
export default class AuthRepository {
    static SAVE_FILENAME = path.join(__data_dir, 'auth-repository.json');
    auths = new Map();
    static id;
    constructor() {
        this.load();
    }
    getUserByEmail = async (email) => {
        let need_key = null;
        for (let [key, value] of this.auths.entries()) {
            if (value.email == email) {
                need_key = key;
                break;
            }
        }
        if (need_key == null) {
            throw new Error(404, `User with id ${email} does not exist`);
        }
        return this.auths.get(need_key);
    };
    async getAuths(ids) {
        if (ids === undefined) {
            return [...this.auths.values()];
        }
        else {
            return ids
                .filter((id) => this.auths.has(Number(id)))
                .map((id) => this.auths.get(Number(id)));
        }
    }
    async create(auth) {
        auth.id = AuthRepository.id++;
        this.auths?.set(auth.id, auth);
        console.info(`[AuthRepository] Auth created: ${auth.email}`);
        await this.save();
        return auth;
    }
    async update(id, auth) {
        if (!this.auths?.has(id)) {
            throw new Error(404, `Auth with ID ${id} is not found`);
        }
        const oldAuth = this.auths.get(id);
        auth.id = auth.id ?? oldAuth.id;
        auth.email = auth.email ?? oldAuth.email;
        auth.password = auth.password ?? oldAuth.password;
        this.auths?.set(id, auth);
        console.info(`[AuthRepository] Auth edited: ${auth.email}`);
        await this.save();
        return auth;
    }
    async delete(id) {
        if (!this.auths?.has(id)) {
            throw new Error(404, `Auth with ID ${id} is not found`);
        }
        this.auths?.delete(id);
        await this.save();
        return true;
    }
    load() {
        if (!fs.existsSync(AuthRepository.SAVE_FILENAME)) {
            console.warn(`[AuthRepository] Storage file ${AuthRepository.SAVE_FILENAME} is not found`);
            return;
        }
        const buf = fs.readFileSync(AuthRepository.SAVE_FILENAME);
        const auths = JSON.parse(buf.toString());
        AuthRepository.id = auths.length;
        for (let authObj of auths) {
            const auth = AuthData.fromObject(authObj);
            this.auths.set(auth.id, auth);
        }
        console.info(`[AuthRepository] Data loaded`);
    }
    async save() {
        const json = Array.from(this.auths.values());
        const data = JSON.stringify(json, null, 2);
        if (!fs.existsSync(path.dirname(AuthRepository.SAVE_FILENAME))) {
            fs.mkdirSync(path.dirname(AuthRepository.SAVE_FILENAME));
            console.log(`[AuthRepository] Created directory ${path.dirname(AuthRepository.SAVE_FILENAME)}`);
        }
        fs.writeFileSync(AuthRepository.SAVE_FILENAME, data);
        console.log(`[UserRepository] Data saved to ${AuthRepository.SAVE_FILENAME}`);
    }
}
//# sourceMappingURL=auth.js.map