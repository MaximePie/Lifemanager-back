const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product');
const tasksController = require('../controllers/task');
const eventsController = require('../controllers/event');

router.get('/', () => {
    console.log("Haha")
});
router.get('/products', productsController.index);
router.get('/products/deleteAll', productsController.deleteAll);
router.get('/products/uncheckAll', productsController.uncheckAll);
router.post('/product', productsController.create);
router.post('/product/delete', productsController.delete);
router.post('/product/updateCheckStatus', productsController.updateCheckStatus);

router.get('/tasks', tasksController.index);
router.post('/task', tasksController.create);
router.post('/task/delete', tasksController.delete);
router.post('/task/updateCheckStatus', tasksController.updateCheckStatus);

router.post('/event', eventsController.create);
router.get('/events', eventsController.index);
router.post('/event/delete', eventsController.delete);
router.post('/event/update', eventsController.update);


module.exports = router;