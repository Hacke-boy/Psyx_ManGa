// routes/users.js

const express = require('express');
const router = express.Router();

// Mock database for demonstration
let users = [];

// Register endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Login successful' });
});

// Profile endpoint
router.get('/profile', (req, res) => {
    const { username } = req.query;
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ username: user.username });
});

module.exports = router;
