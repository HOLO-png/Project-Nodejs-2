const User = require('../models/User.js');
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const user = {
    getUserInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    updateUserProfile: async (req, res) => {
        const { id } = req.user;
        const { username, gender, dateOfBirth, profilePicture, phoneNumber } =
            req.body;

        try {
            if (id) {
                const user = await User.update(
                    { _id: id },
                    {
                        $set: {
                            username,
                            gender,
                            dateOfBirth,
                            profilePicture,
                            phoneNumber,
                        },
                    },
                );
                res.status(200).json(user);
            } else {
                throw { status: 500, message: 'You are not logged in' };
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = user;
