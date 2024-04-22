const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    puzzle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puzzle',
        required: true
    },
    selectedSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
}, {
    _id: false,
    timestamps: false
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'completed', 'Cancelled'],
        default: 'Pending'
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },

    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);
