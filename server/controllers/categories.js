const Category = require("../models/categories");

// Saves the category in the db
exports.createCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name
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
      // res.status(500).json({
      //
      // })
    })
};
