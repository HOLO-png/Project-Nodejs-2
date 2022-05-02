const express = require('express');
const app = express();
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users.js');
const authRoute = require('./routes/auth.js');
const productsRoute = require('./routes/products.js');
const inputFieldRoute = require('./routes/inputFieldConfigProduct.js');
const imgLogoFieldRoute = require('./routes/imageLogoField.js');
const selectFieldRoute = require('./routes/selectField.js');
const cartRoute = require('./routes/cart.js');
const commentRoute = require('./routes/comment.js');
const searchRoute = require('./routes/search.js');
const categoryRoute = require('./routes/category.js');
const userAddressRoute = require('./routes/userAddress.js');
const paymentRoute = require('./routes/payment.js');

const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
dotenv.config();

paypal.configure({
    mode: 'sandbox',
    client_id:
        'AZU-WEDM-F1OZ0P4WasT4a-HzcvfmhwffXXukQJqKEd6LysONXMW-O8z7oTPKgGkg0zONh-mkA5YumFL',
    client_secret:
        'EBmpfnknSWl2MmTFoUPXJoUOoibPB7xM79-EKrBaga-SmTfloKmsoUJM36OW-zBARbipVNFS6rAPB_90',
});

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('Connected to mongoDb Atlas.');
    },
);

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));
app.use(cors({ origin: true, credentials: true }));

//mail sender detail
app.use(function (req, res, next) {
    // Mọi domain
    res.header('Access-Control-Allow-Origin', '*');

    // Domain nhất định
    // res.header("Access-Control-Allow-Origin", "https://freetuts.net");

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use('/api/auth', authRoute);
app.use('/api/input-field', inputFieldRoute);
app.use('/api/select-field', selectFieldRoute);
app.use('/api/logo-field', imgLogoFieldRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/comment', commentRoute);
app.use('/api/search', searchRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user-address', userAddressRoute);
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Backend server is running with Port ${PORT}`);
});
