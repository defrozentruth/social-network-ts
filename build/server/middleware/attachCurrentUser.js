import { UserModel } from "../adapters/mongo/schema/user.js";
export default async (req, res, next) => {
    const decodedTokenData = req.token;
    const userRecord = await UserModel.findOne({ id: decodedTokenData.id });
    req.currentUser = userRecord;
    if (!userRecord) {
        return res.status(401).end('User not found');
    }
    else {
        return next();
    }
};
//# sourceMappingURL=attachCurrentUser.js.map