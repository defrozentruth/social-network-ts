import { expressjwt } from 'express-jwt';
const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
};
export default expressjwt({
    algorithms: [],
    secret: 'sEKret_VVord',
    requestProperty: 'token',
    getToken: getTokenFromHeader
});
//# sourceMappingURL=IsAuth.js.map