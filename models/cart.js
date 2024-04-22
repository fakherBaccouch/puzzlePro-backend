const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'puzzle',
        required: true
    },
    selectedSize: {
     type: String, enum: ['small', 'medium', 'large'], required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, {
    _id: false, 
    timestamps: true
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;