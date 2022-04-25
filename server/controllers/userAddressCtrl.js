const UserAddress = require('../models/UserAddress.js');

const userAddressCtrl = {
    createUserAddress: async (req, res) => {
        try {
            if (req.user.id) {
                const { address, username, phoneNumber, status } = req.body;

                const userAddress = await UserAddress.findOne({
                    userId: req.user.id,
                });

                if (userAddress) {
                    const isCheck = userAddress.items.some((item) => {
                        return (
                            item.address.tinh === address.tinh &&
                            item.address.quan === address.quan &&
                            item.address.xa === address.xa
                        );
                    });
                    console.log(isCheck);

                    if (isCheck) {
                        return res
                            .status(400)
                            .json({ msg: 'Bạn đã có địa chỉ này!' });
                    } else {
                        const item = {
                            username,
                            phoneNumber,
                            address,
                            status,
                        };
                        if (status) {
                            userAddress.items.forEach((item) => {
                                item.status = false;
                            });
                            const items = [...userAddress.items, item];
                            userAddress.items = items;
                            const savedUserAddress = await userAddress.save();
                            return res.status(200).json({ savedUserAddress });
                        } else {
                            const items = [...userAddress.items, item];
                            userAddress.items = items;
                            const savedUserAddress = await userAddress.save();
                            return res.status(200).json({ savedUserAddress });
                        }
                    }
                } else {
                    const item = {
                        username,
                        phoneNumber,
                        address,
                        status: true,
                    };
                    const items = [item];
                    const newUserAddress = new UserAddress({
                        userId: req.user.id,
                        items,
                    });
                    const savedUserAddress = await newUserAddress.save();
                    return res.status(200).json({ savedUserAddress });
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    getUserAddress: async (req, res) => {
        try {
            if (req.user.id) {
                const userAddress = await UserAddress.findOne({
                    userId: req.user.id,
                });

                return res.status(200).json({ userAddress });
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUserAddressItem: async (req, res) => {
        try {
            const { userAddressId } = req.params;
            const { address, username, phoneNumber } = req.body;

            if (req.user.id) {
                const userAddress = await UserAddress.findOne({
                    userId: req.user.id,
                });

                const isCheck = userAddress.items.some((item) => {
                    return (
                        item.address.tinh === address.tinh &&
                        item.address.quan === address.quan &&
                        item.address.xa === address.xa &&
                        item.username === username &&
                        item.phoneNumber === phoneNumber
                    );
                });

                if (!isCheck) {
                    const newAddress = userAddress.items.map((item) => {
                        if (item._id.toString() === userAddressId) {
                            const newItem = {
                                username,
                                phoneNumber,
                                address,
                                status: true,
                                _id: item._id,
                            };
                            return newItem;
                        } else {
                            return item;
                        }
                    });
                    userAddress.items = newAddress;
                    await userAddress.save();

                    return res.status(200).json({ userAddress });
                } else {
                    return res.status(400).json('Bạn đã có địa chỉ này!');
                }
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    setIsActiveUserAddressItem: async (req, res) => {
        try {
            const { userAddressId } = req.params;

            if (req.user.id) {
                const userAddress = await UserAddress.findOne({
                    userId: req.user.id,
                });

                userAddress.items.forEach((item) => {
                    if (item._id.toString() === userAddressId) {
                        item.status = true;
                    } else {
                        item.status = false;
                    }
                });
                await userAddress.save();
                return res.status(200).json({ userAddress });
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userAddressCtrl;
