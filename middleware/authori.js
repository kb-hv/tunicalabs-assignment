const jwtDecode = require('jwt-decode')
const JWT = require('jsonwebtoken');
const User = require('../models/User')

const noAuth = (req, res, next) => {
    const token = req.cookies["access_token"]
    if (token) {
        JWT.verify(token, 'thisisakey', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            } else {
                res.redirect('/');
            }
        });
    } else {
        next();
    }
}

const verifyUser = (req, res, next) => {
    const token = req.cookies["access_token"]
    if (token) {
        JWT.verify(token, 'thisisakey', async (err, decodedToken) => {
            if (err) {
                res.clearCookie('access_token');
                res.locals.user = null;
                res.redirect('/login');
            } else {
                // set user details in res.locals
                let user = await User.findById(jwtDecode(token).sub)
                    .then(data => {
                        if (data) {
                            return data.toObject();
                        } else
                            return data
                    })
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.redirect('/login');
    }
}

module.exports = { noAuth, verifyUser }