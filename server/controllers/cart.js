const Cart = require("../models/cart");


// Saves the cart in the db
exports.createCart = (req, res, next) => {
  //   if (dbResponse !== null) {
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

// Get cart from db
exports.getCart = (req, res, next) => {
  Cart.find({userId: req.params.userId, status: 1}, (err, dbResponse) => {
    if (err) {
      console.log(err);
    }
    if (dbResponse.length === 0) {
      res.status(201).json({
        message: 'Welcome to our shop',
      })
    } else {
      res.status(201).json({
          message: 'You have an open cart from',
          cart: dbResponse,
        })
    }
  });
};

