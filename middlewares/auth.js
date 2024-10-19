const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ msg: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ msg: 'Failed to authenticate token' });

        // If token is valid, save decoded info for use in other routes
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
