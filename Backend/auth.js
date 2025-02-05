const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const User = require('./models/user');


const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, firstName, lastName, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match confirm password" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            firstname:firstName,
            lastname:lastName,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.SECRET_KEY,
            { expiresIn: '3d' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
