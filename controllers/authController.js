const User = require("../models/User");
const passportConfig = require('../middleware/passport');
const JWT = require('jsonwebtoken');

const signToken = (userID) => {
    return JWT.sign(
        {
            iss: "kbhv",
            sub: userID
        },
        "thisisakey", // secret key
        { expiresIn: "1h" }
    )
}

module.exports.login_get = (req, res) => {
    res.render('auth/login', { msg: null, error: false })
}

module.exports.login_post = async (req, res) => {
    if (req.isAuthenticated()) {
        const { _id } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.redirect('/')
    }
}

module.exports.login_error_get = async (req, res) => {
    res.render('auth/login', { msg: 'Invalid Credentials', error: true })
}

module.exports.logout_get = async (req, res) => {
    res.clearCookie('access_token');
    res.render('auth/login', { msg: 'You\'ve been logged out', error: false })
}

module.exports.home_get = async (req, res) => {
    const token = req.cookies['access_token']
    if (token) {
        res.redirect('/user/')
    }
    else {
        res.clearCookie('access_token');
        res.redirect('/login')
    }
}

// front-end not implemented
module.exports.register_post = async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Already Registered", msgError: true } });
        else {
            const newUser = new User({
                username,
                password,
                students: [],
            });
            newUser.save(err => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                }
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }
    });
}