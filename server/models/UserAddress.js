const mongoose = require('mongoose');

const UserAddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            username: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            address: {
                tinh: {
                    type: String,
                    required: true,
                },
                quan: {
                    type: String,
                    required: true,
                },
                xa: {
                    type: String,
                    required: true,
                },
                mota: {
                    type: String,
                    required: true,
                },
            },
            status: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    ],
});

module.exports = mongoose.model('UserAddress', UserAddressSchema);
