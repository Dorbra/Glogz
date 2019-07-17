const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User Model


// @route GET /users
// @
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('ERROR: ' + err));
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
        res.status(400).json({ msg: 'Please provide all fields.' })
    }

    // Check for existing User
    User.findOne({ username })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Username already exists!' });

            const newUser = new User({
                username, password
            });
            console.log(newUser);
            // Create Hash & Salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            username: user.username,
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        })
});

/* router.route('/add').post((req, res) => {
    console.log(req.body);

    if (req.body.username) {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = new User({ username, password });

        newUser.save()
            .then((data) => res.json(data))
            .catch(err => res.status(400).json("ERROR: " + err));
    } else {
        res.json({
            error: "Must provide a username & password"
        })
    }
}); */

module.exports = router;