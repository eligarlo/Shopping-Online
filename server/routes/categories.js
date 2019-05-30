const express = require("express");

const categoryController = require("../controllers/categories");

const router = express.Router();

// In the frontend will be /api/category/addCategory
// Saves category in the db
router.post('/addCategory', categoryController.createCategory);

module.exports = router;
