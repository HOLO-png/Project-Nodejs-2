const router = require('express').Router();
const auth = require('../middleware/auth.js');
const productsCtrl = require('../controllers/productsCtrl.js');
const categorySidebarCtrl = require('../controllers/categorySidebaarCtrl.js');

// get product admin

router.get('/', productsCtrl.getProducts);
router.get('/search', productsCtrl.searchProduct);
router.get('/star', productsCtrl.filterStarProducts);
router.get('/price', productsCtrl.filterPriceProduct);
router.get('/:productId', productsCtrl.getProduct);
router.post('/', productsCtrl.createProduct);
router.put('/:productId', auth, productsCtrl.updateProductLike);

module.exports = router;
