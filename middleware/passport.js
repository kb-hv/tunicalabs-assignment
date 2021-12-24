const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')

// authenticate
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                if (!user) {
                    return done(null, false)
                }
                return user.comparePassword(password, done);
            });
        }
))