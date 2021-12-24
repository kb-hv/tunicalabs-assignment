const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    school: {
        type: String,
        enum: ['cse', 'ece', 'it'],
        required: true
    },
    class: {
        type: String,
        enum: ['1', '2', '3'],
        required: true
    },
    division: {
        type: String,
        enum: ['a', 'b'],
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
    },
    createdBy: { // User _id
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Student', StudentSchema)