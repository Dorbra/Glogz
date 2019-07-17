const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) res.status(401).json({ msg: 'No Token, Invalid authorization ' });
    
    try {
        // Check for token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from token payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Invalid Token!' })
    }
}

module.exports = auth;