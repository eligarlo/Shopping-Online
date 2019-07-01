const Cart = require("../models/cart");


// Saves the cart in the db
exports.createCart = (req, res, next) => {
  const cart = new Cart({
    userId: req.body.userId,
    date: Date.parse(Date()),
    status: 1,
  });
  cart.save()
    .then(cart => {
      res.status(201).json({
        message: 'Cart created successfully!',
        cart: cart
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Cart couldn\'t be created'
      })
    })
};

// Saves products inside the cart
exports.saveProductToCart = (req, res, next) => {
  Cart.findOneAndUpdate({_id: req.body.cartId},
    { $push: {
      products: {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
      }
      }
    },
    { new: true },
    (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong'
      });
    }
    res.status(201).json({
      message: 'Product added successfully!'
    })
    })

};

// Deletes products from the cart
exports.deleteProductFromCart = (req, res, next) => {
  Cart.update({_id: req.body.cartId},
    {$pull: {
      products: {_id: req.body.productId}
      }
    },
    {safe: true, multi: true},
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!"
        });
      }
      res.status(201).json({
        message: "Product deleted"
      });
    })
};

// Deletes all products from the cart
exports.deleteAllProductsFromCart = (req, res, next) => {
  Cart.update({_id: req.body.cartId},
    {$pull: {
      products: { $elemMatch: {_id: req.body.productsId}}
      }
    },
    {safe: true, multi: true},
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!"
        });
      } else {
        res.status(201).json({
          message: "All products deleted"
        });
      }
    })
};

// Get cart from db
/*
*   Status 1 === User has an open cart
*   Status 2 === User ordered in the past
*/
exports.getCart = (req, res, next) => {
  Cart.find({userId: req.params.userId, status: 1}, (err, dbResponse1) => {
    if (err) {
      console.log(err);
    }
    if (dbResponse1.length === 0) {
      Cart.find({userId: req.params.userId, status: 2}, (errResponse, dbResponse2) => {
        if (dbResponse2[dbResponse2.length - 1]) {
          const lastCart = [dbResponse2[dbResponse2.length - 1]];
          return res.status(201).json({
            message: 'Your last order was from',
            cart: lastCart,
            hasOpenCart: false
          });
        } else {
          return res.status(201).json({
            message: 'Welcome to our shop',
          });
        }
      });
    } else {
      return res.status(201).json({
        message: 'You have an open cart from',
        cart: dbResponse1,
        hasOpenCart: true
      });
    }
  });
};

// Get cart by it's _id from db
exports.getCartById = (req, res, next) => {
  Cart.find({_id: req.params.cartId})
    .then(cart => {
      res.status(201).json({
        cart
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong.'
      })
    })
};
