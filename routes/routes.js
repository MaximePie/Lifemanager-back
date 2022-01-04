const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product');

router.get('/products', productsController.index);
router.get('/products/deleteAll', productsController.deleteAll);
router.get('/products/uncheckAll', productsController.uncheckAll);
router.post('/product', productsController.create);
router.post('/product/delete', productsController.delete);
router.post('/product/updateCheckStatus', productsController.updateCheckStatus);

module.exports = router;