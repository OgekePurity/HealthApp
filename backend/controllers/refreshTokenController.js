const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = crypto.randomBytes(40).toString('hex');
const refreshTokenSecret = crypto.randomBytes(40).toString('hex');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
       refreshTokenSecret,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                    }
                },
                accessTokenSecret,
                { expiresIn: '10s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }