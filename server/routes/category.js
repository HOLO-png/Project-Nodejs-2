const router = require('express').Router();
const categorySidebarCtrl = require('../controllers/categorySidebaarCtrl.js');

// get category admin
router.get('/', categorySidebarCtrl.getDataCategoryStore);
router.get('/get-products', categorySidebarCtrl.handleGetProductsCategory);
router.post('/star', categorySidebarCtrl.filterStarProducts);
router.post('/price', categorySidebarCtrl.filterPriceProduct);
router.post('/trademark', categorySidebarCtrl.filterTrademarkProduct);

module.exports = router;
