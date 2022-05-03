const Cart = require('../models/Cart.js');
const User = require('../models/User.js');
const Order = require('../models/Order.js');

const orderCtrl = {
    createOrder: async (req, res) => {
        const { username, phoneNumber, city, productsID } = req.body;
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
};

module.exports = orderCtrl;
