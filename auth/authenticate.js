const getTokenFromHeader = require('./getTokenfromHeader');
const { jsonresponse } = require('../lib/jsonResponse.js');
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
            .send(jsonresponse(401, { error: 'Unauthorized token 0' }));
    }
}
module.exports = authenticate;