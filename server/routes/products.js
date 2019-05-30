const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

// In the frontend will be /api/product/addProduct
// Saves product in the db
router.post('/addProduct', productController.createProduct);

module.exports = router;
