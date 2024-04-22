const mongoose = require('mongoose');
const puzzle_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    sizes: [{
        size: {
            type: String,
            enum: ['small', 'medium', 'large'],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    imgUrl : {
        type: String
    }
});

module.exports = mongoose.model('puzzle', puzzle_schema);