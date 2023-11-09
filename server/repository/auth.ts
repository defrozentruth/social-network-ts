import AuthData from "../models/auth.js";

export default interface AuthRepository{
    create(authData: AuthData): Promise<Partial<AuthData>>
    getUserByEmail(email: string): Promise<AuthData>
}