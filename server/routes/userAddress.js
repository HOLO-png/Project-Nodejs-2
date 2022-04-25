const router = require('express').Router();
const userAddressCtrl = require('../controllers/userAddressCtrl.js');
const auth = require('../middleware/auth.js');

router.get('/', auth, userAddressCtrl.getUserAddress);
router.post('/', auth, userAddressCtrl.createUserAddress);
router.put('/:userAddressId', auth, userAddressCtrl.updateUserAddressItem);
router.patch(
    '/status/:userAddressId',
    auth,
    userAddressCtrl.setIsActiveUserAddressItem,
);

module.exports = router;
