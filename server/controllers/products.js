const Product = require("../models/products");

// Saves the product in the db
exports.createProduct = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    imagePath: `${url}/productImages/${req.file.filename}`,
    creator: req.userData.userId
  });
  product.save()
    .then(result => {
      res.status(201).json({
        message: 'Product created!',
        result: result
      })
    })
    .catch(err => {
      console.log(err);
    });
};
