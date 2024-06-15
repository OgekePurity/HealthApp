const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = crypto.randomBytes(40).toString('hex');
const refreshTokenSecret = crypto.randomBytes(40).toString('hex');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) {
            return res.sendStatus(401); //Unauthorized
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { UserInfo: { username: foundUser.username } },
                accessTokenSecret,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { username: foundUser.username },
                refreshTokenSecret,
                { expiresIn: '1d' }
            );

            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();

          // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { handleLogin };
