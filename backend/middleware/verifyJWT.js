const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = crypto.randomBytes(40).toString('hex');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        accessTokenSecret,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
           
            next();
        }
    );
}

module.exports = verifyJWT