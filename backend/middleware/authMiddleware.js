// backend/middleware/authMiddleware.js (New Version)
// This file is rewritten to use JWT instead of Firebase Admin SDK.
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the database using the ID from the token
            const { rows } = await db.query('SELECT id, username, email, role, is_blocked FROM users WHERE id = $1', [decoded.id]);

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            const user = rows[0];

            if (user.is_blocked) {
                return res.status(403).json({ message: 'Your account has been blocked.' });
            }

            // Attach user to the request object (without the password hash)
            // Renaming 'id' to 'uid' for frontend consistency
            req.user = { uid: user.id, ...user };
            delete req.user.id;

            next();
        } catch (error) {
            console.error('JWT verification error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
