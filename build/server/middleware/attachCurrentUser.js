import UserRepository from "../repository/user.js";
export default async (req, res, next) => {
    const decodedTokenData = req.token;
    const UsRep = new UserRepository;
    const userRecord = await UsRep.getById(decodedTokenData.id);
    req.currentUser = userRecord;
    if (!userRecord) {
        return res.status(401).end('User not found');
    }
    else {
        return next();
    }
};
//# sourceMappingURL=attachCurrentUser.js.map