const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        username: String,
        complete: { type: String, default: 'pending' },
        email: { type: String, default: '' },
        phoneNumber: {
            type: String,
            required: true,
        },
        city: { type: Object, required: true },
        products: [{ type: String, required: true }],
        userID: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', OrderSchema);
