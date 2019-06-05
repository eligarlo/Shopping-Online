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

// Get all products from the db
exports.getProducts = (req, res, next) => {
  const productQuery = Product.find({});

  productQuery.then(products => {
    res.status(200).json({
      message: 'Products fetched successfully!',
      products: products
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching products failed!'
      })
    })
};

// Get all products by category
exports.getProductByCategory = (req, res, next) => {
  const productQuery = Product.find({category: req.params.categoryName});

  productQuery.then(products => {
      res.status(201).json({
        message: 'Products fetched successfully!',
        products: products
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching products failed'
      })
    })
};
