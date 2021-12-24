const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {// if password is hashed 
        return next();
    } else {
        bcrypt.hash(this.password, 10, (err, passwordHash) => {
            if (err)
                return next(err)
            this.password = passwordHash
            return next()
        }) 
    }
})

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err)
        else
            if (!isMatch)
                return cb(null, isMatch)
        return cb(null, this) // return user object
    })
}

module.exports = mongoose.model('User', UserSchema)