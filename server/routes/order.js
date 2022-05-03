const router = require('express').Router();
const orderCtrl = require('../controllers/orderCtrl.js');
const auth = require('../middleware/auth.js');

router.post('/', auth, orderCtrl.createOrder);

module.exports = router;
