const User = require('../model/User');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

const handleLogout = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Find the user by username
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) {
            return res.sendStatus(401); // Unauthorized
        }

        // Verify the password
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // Clear the refresh token
            foundUser.refreshToken = null;
            const result = await foundUser.save();

            // Remove the JWT cookie
            res.clearCookie('jwt');

            res.json({ message: 'Logout successful.' });
        } else {
            res.sendStatus(401); // Unauthorized
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { handleLogout };
