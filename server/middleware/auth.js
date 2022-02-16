const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(600).json({ msg: 'Invalid authentication 1!' });
        }
        console.log(token);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res
                    .status(700)
                    .json({ msg: 'Invalid authentication 2!' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = auth;
