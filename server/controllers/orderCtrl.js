const Cart = require('../models/Cart.js');
const User = require('../models/User.js');
const Order = require('../models/Order.js');

const orderCtrl = {
    createOrder: async (req, res) => {
        const {
            username,
            phoneNumber,
            city,
            productsID,
            isPayment,
            message,
            paymentFee,
            serviceTypeId
        } = req.body;
        const { id } = req.user;

        try {
            if (id) {
                const userCart = await Cart.findOne({ userId: id });
                const products = [];

                userCart.cart.items.forEach((item) => {
                    if (productsID.includes(item._id.toString())) {
                        products.push(item);
                    }
                });

                const user = await User.findOne({ _id: id });
                if (user) {
                    const order = new Order({
                        username,
                        email: user.email,
                        phoneNumber,
                        city,
                        products,
                        userID: id,
                        isPayment,
                        message,
                        paymentFee,
                        serviceTypeId
                    });

                    const newOrder = await order.save();
                    res.status(200).json({ newOrder });
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getOrderUser: async (req, res) => {
        const { id } = req.user;
        try {
            if (id) {
                const orders = await Order.find({ userID: id });
                res.status(200).json({ orders });
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getOrdersInStore: async (req, res) => {
        try {
            const orders = await Order.find();
            return res.status(200).json({ orders });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    updateStatusOrder: async (req, res) => {
        const { orderId } = req.params;
        const { complete } = req.body;
        console.log({ orderId, complete });

        try {
            const order = await Order.findOne({ _id: orderId });
            order.complete = complete;
            await order.save();
            return res.status(200).json({ order });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};

module.exports = orderCtrl;
