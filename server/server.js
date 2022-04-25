const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
dotenv.config();

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

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Backend server is running with Port ${PORT}`);
});
