const CheckDate = require('../middleware/checkDate');

const UserModel = require("../models/user");
const CartModel = require("../models/cart");
const DateModel = require("../models/date");
const OrderModel = require("../models/order");

// Gets the shipment details of the user from db
exports.getShipmentDetails = (req, res, next) => {
  let fetchedUser;
  UserModel.findOne({_id: req.params.userId})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'There is not such a user, please register!',
        });
      }
      fetchedUser = user;
      return res.status(200).json({
        city: fetchedUser.city,
        street: fetchedUser.street
      })
    })
};

// Saves an order in the db
exports.createOrder = (req, res, next) => {
  const checkDate = CheckDate(req.body.deliveryDate);
  if (checkDate) {
    DateModel.find({date: new Date(req.body.deliveryDate)}, (err, dbResponse) => {
      if (err) {
        console.log(err);
      }
      // If the delivery date does not contain any order will create a new Date in the db
      if (dbResponse.length === 0) {
        const order = newOrder(req);
        order.save()
          .then(orderRes => {
          const deliveryDate = new DateModel();
          deliveryDate.date = orderRes.deliveryDate;
          deliveryDate.orders.push({order: orderRes._id});
          deliveryDate.save()
            .then(deliveryRes => {
              updateCartStatus(req);
              return res.status(201).json({
                message: 'Your order was added to our system successfully!',
                status: true
              });
            });
        });
      }
      /*
      * If there are already orders for that date
      * will check if there are no more than 3
      */
      else if (dbResponse[0].orders.length < 3) {
        const order = newOrder(req);
        order.save()
          .then(orderRes => {
            updateCartStatus(req);
            updateDeliveryDate(res, dbResponse, orderRes);
          });
      } else {
        return res.status(409).json({
          message: 'Sorry, we are fully booked for that date',
          status: false
        });
      }
    })
  }
};

// Get all orders from the db
exports.getOrders = (req, res, next) => {
  const orderQueryFind = OrderModel.find({});

  orderQueryFind.then(orders => {
    res.status(200).json({
      message: 'Orders fetched successfully!',
      orders: orders.length
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching orders failed!'
      })
    })
};

const newOrder = (req) => {
  return new OrderModel({
    userId: req.body.userId,
    cartId: req.body.cartId,
    totalPrice: req.body.totalPrice,
    city: req.body.city,
    street: req.body.street,
    orderDate: new Date(),
    deliveryDate: new Date(req.body.deliveryDate),
    creditCard: req.body.creditCard
  });
};

const updateDeliveryDate = (res, dbResponse, orderRes) => {
  DateModel.findOneAndUpdate({_id: dbResponse[0]._id},
    { $push: {
        orders: {
          order: orderRes._id
        }
      }
    },
    { new: true },
    (errRes, result) => {
      if (errRes) {
        console.log(errRes);
      } else {
        return res.status(201).json({
          message: 'Your order was added to our system successfully!',
          status: true
        });
      }
    });
};

const updateCartStatus = (req, res) => {
  CartModel.findOneAndUpdate(
    { _id: req.body.cartId },
    { $set: { status: 2 } },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    });
};
