const express = require("express");

const checkUserAuth = require("../middleware/check-user-auth");

const cartController = require("../controllers/cart");

const router = express.Router();

// In the frontend will be /api/cart/addCart
// Saves cart in the db
router.post('/addCart', checkUserAuth, cartController.createCart);

// In the frontend will be /api/cart/addProduct
// Saves products inside the cart
router.post('/addProduct', checkUserAuth, cartController.saveProductToCart);

// In the frontend will be /api/cart/deleteProduct
// Deletes products from the cart
router.post('/deleteProduct', checkUserAuth, cartController.deleteProductFromCart);

// In the frontend will be /api/cart/getCart
// Get cart from db
router.get('/getCart/:userId', checkUserAuth, cartController.getCart);

// In the frontend will be /api/cart/getCart/:cartId
// Get cart from db
router.get('/getByCartId/:cartId', checkUserAuth, cartController.getCartById);

module.exports = router;
