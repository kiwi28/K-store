const express = require('express');
const authorizedMiddleware = require('../authorized');

const productControllers = require('../controllers/productControllers');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/index', authorizedMiddleware, productControllers.getProducts);
router.post('/admin', authorizedMiddleware, productControllers.addProduct);
router.post('/product', authorizedMiddleware, productControllers.getProduct);
router.post('/cart', productControllers.cart)
module.exports = router;