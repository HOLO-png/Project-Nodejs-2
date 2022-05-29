const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEMail = require('../utils/sendMail.js');
const fetch = require('node-fetch');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const authCtrl = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;
            if (!username || !password || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'missing username, password, email!',
                });
            }

            if (!validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid Email!',
                });
            }

            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'this email already exists!',
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid password!',
                });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new User({
                username: username,
                email: email,
                password: passwordHash,
            });

            const activation_token = createActivationToken(newUser);

            const url = `${process.env.CLIENT_URL}/activate/${activation_token}`;

            sendEMail(email, url, username, 'Please verify your email!');

            res.status(200).json({ msg: 'Register success!!' });
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ msg: error.message });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;

            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET,
            );

            const { username, email, password } = user;

            const check = await User.findOne({ email });
            if (check) {
                return res
                    .status(400)
                    .json({ msg: 'this email already exists' });
            }

            const newUser = new User({
                username,
                email,
                password,
            });

            const userObj = await newUser.save();
            const refresh_token = createAccessToken({ id: userObj._id });

            return res.status(200).json({ newUser, refresh_token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({
                    msg: 'This email and/or password does not exists!',
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    msg: 'This email and/or password does not exists!',
                });

            const refresh_token = createAccessToken({ id: user._id });

            res.status(200).json({ user, refresh_token });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'this email does not exists.' });
            }
            const access_token = createAccessToken({ id: user._id });

            const url = `${process.env.CLIENT_URL}/reset-password/${access_token}`;

            sendEMail(
                email,
                url,
                user.username,
                'Please click to reset password',
            );

            res.status(200).json({
                msg: 're-send the password, please check your email!',
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password_old, password_new } = req.body;

            const verify_account = await User.findOne({ _id: req.user.id });
            if (!verify_account) {
                return res
                    .status(400)
                    .json({ msg: 'this email does not exists.' });
            }

            const isMatch = await bcrypt.compare(
                password_old,
                verify_account.password,
            );
            console.log(verify_account);
            if (!isMatch)
                return res.status(400).json({
                    msg: 'This email and/or password does not exists!',
                });

            const passwordHash = await bcrypt.hash(password_new, 12);

            await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    password: passwordHash,
                },
            );
            res.status(200).json({
                msg: 'Password successfully changed!',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { tokenId } = req.body;

            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.MAILING_SERVICE_CLIENT_ID,
            });
            const { email, email_verified, name, picture } = verify.payload;
            const password = email + process.env.GOOGLE_SECRET;
            const passwordHash = await bcrypt.hash(password, 12);

            if (!email_verified) {
                return res
                    .status(400)
                    .json({ msg: 'Email verification failed' });
            }
            const user = await User.findOne({ email });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res
                        .status(400)
                        .json({ msg: 'Password is incorrect' });
                }
                const refresh_token = createAccessToken({ id: user._id });

                res.status(200).json({ user, refresh_token });
            } else {
                const newUser = new User({
                    username: name,
                    password: passwordHash,
                    email,
                    profilePicture: picture,
                });

                await newUser.save();

                const refresh_token = createAccessToken({
                    id: newUser._id,
                });
                res.status(200).json({ newUser, refresh_token });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const { accessToken, userID } = req.body;

            console.log({ accessToken, userID });

            const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

            const data = await fetch(URL)
                .then((res) => res.json())
                .then((res) => {
                    return res;
                });

            const { email, name, picture } = data;


            const password = email + process.env.FACEBOOK_SECRET;
            const passwordHash = await bcrypt.hash(password, 12);

            if (!data) {
                return res
                    .status(400)
                    .json({ msg: 'Email verification failed' });
            }

            const user = await User.findOne({ email });

            console.log({ user });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res
                        .status(400)
                        .json({ msg: 'Password is incorrect' });
                }
                const refresh_token = createAccessToken({ id: user._id });

                res.status(200).json({ user, refresh_token });
            } else {
                const newUser = new User({
                    username: name,
                    password: passwordHash,
                    email,
                    profilePicture: picture.data.url,
                });

                await newUser.save();
                console.log(newUser);

                const refresh_token = createAccessToken({
                    id: newUser._id,
                });

                res.status(200).json({ newUser, refresh_token });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
};

const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
};

const createActivationToken = (payload) => {
    return jwt.sign(payload.toJSON(), process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: '5m',
    });
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2d',
    });
};

module.exports = authCtrl;
