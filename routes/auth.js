const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../authenticate');
const User = require('../models/User'); // User Model


// @route POST /auth
// Authenticate user
router.post('/', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ msg: 'Please provide all fields.' })
    }

    // Check for existing User
    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Username Does not exists!' });

            // Create Hash & Salt
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Password does not match!' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                }
                            });
                        }
                    )
                });
        })
});

// Private GET auth/user
// Get Current user data
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;