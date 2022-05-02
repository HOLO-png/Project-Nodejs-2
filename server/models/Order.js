const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        username: String,
        complete: { type: String, default: 'pending' },
        email: { type: String, default: '' },
        phoneNumber: {
            type: String,
            default: '',
        },
        city: { type: String, default: '' },
        products: [{}],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', OrderSchema);
