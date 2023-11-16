const getTokenFromHeader = require('./getTokenfromHeader');
const { jsonResponse } = require('../lib/jsonResponse');
const { verifyAccessToken } = require('./verifyTokens');

function authenticate(req, res, next) {
    console.log(req.headers, 'req.header')
    const token = getTokenFromHeader(req.headers);
    console.log('token', token);
    if (token) {
        const decoded = verifyAccessToken(token)
        req.user = {...decoded.email };
        next();
    } else {
        res
            .status(401)
            .send(jsonResponse(401, { error: 'Unauthorized token 0' }));
    }
}
module.exports = authenticate;