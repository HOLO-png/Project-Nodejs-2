const User = require('../models/User.js');

const userAddressCtrl = {
    createUserAddress: async (req, res) => {
        try {
            if (req.user.id) {
                const user = await User.findById(req.user.id);
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }

            res.status(200).json({ msg: 'Register success!!' });
        } catch (error) {
            console.log(error);

            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = userAddressCtrl;
