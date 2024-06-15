const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleNewUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, , and email are required.' });
    }

    try {
        // Check for duplicate usernames or emails in the db
        const duplicateUsername = await User.findOne({ username }).exec();
        const duplicateEmail = await User.findOne({ email }).exec();
        if (duplicateUsername) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        if (duplicateEmail) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // Check if passwords match
        /* if (password !== matchpassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        } */

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create and store the new user
        const newUser = new User({
            username,
            password: hashedPwd,
            email
        });
        const result = await newUser.save();

        // Generate JWT token
      /*   const token = jwt.sign({ userId: newUser._id }, 'your_secret_key_here', { expiresIn: '1h' });

        res.status(201).json({ success: 'New user created!', token }); */
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleNewUser };
