const express = require("express");

const checkManagerAuth = require("../middleware/check-manager-auth");

const categoryController = require("../controllers/categories");

const router = express.Router();

// In the frontend will be /api/category/addCategory
// Saves category in the db
router.post('/addCategory', checkManagerAuth, categoryController.createCategory);

// In the frontend will be /api/category/getCategories
// Gets all the categories from the db
router.get('/getCategories', categoryController.getCategories);

module.exports = router;
