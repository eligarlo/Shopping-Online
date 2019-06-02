const Category = require("../models/categories");

// Saves the category in the db
exports.createCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    creator: req.userData.userId
  });
  category.save()
    .then(result => {
      res.status(201).json({
        message: 'Category created!',
        result: true
      })
    })
    .catch(err => {
      console.log(err);
    })
};

// Gets all the categories from the db
exports.getCategories = (req, res, next) => {
  const categoryQuery = Category.find({});

  categoryQuery.then(categories => {
    res.status(200).json({
      message: 'Categories fetched successfully!',
      categories: categories
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching categories failed!'
      })
    })
};
