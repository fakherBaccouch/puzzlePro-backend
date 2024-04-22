const mongoose = require('mongoose');
const user_schema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, index: true },
    password: { type: String },
    phoneNumber: { type: String },
    role: {
        type: String,
        default: "user"
    },
    address: {
        street: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },
        zip: {
            type: String,

        },
        country: {
            type: String,

        }
    },
    image: { type: String },

});

module.exports = mongoose.model('user', user_schema);