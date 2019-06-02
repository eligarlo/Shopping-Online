const express = require("express");

const checkManagerAuth = require("../middleware/check-manager-auth");
const uploadFile = require("../middleware/fileUpload");

const productController = require("../controllers/products");

const router = express.Router();

// In the frontend will be /api/product/addProduct
// Saves product in the db
router.post('/addProduct', checkManagerAuth, uploadFile, productController.createProduct);

// In the frontend will be /api/product/getProducts
// Gets all the products from the db
router.get('/getProducts', productController.getProducts);

module.exports = router;
