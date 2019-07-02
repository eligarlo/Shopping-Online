const express = require("express");

const checkUserAuth = require("../middleware/check-user-auth");

const orderController = require("../controllers/order");

const router = express.Router();

// In the frontend will be /api/order/getShipmentDetails
// Gets the shipment details of the user from db
router.get('/getShipmentDetails/:userId', checkUserAuth, orderController.getShipmentDetails);

// In the frontend will be /api/order/createOrder
// Saves an order in the db
router.post('/createOrder', checkUserAuth, orderController.createOrder);

// In the frontend will be /api/order/getOrders
// Gets all the orders from the db
router.get('/getOrders', orderController.getOrders);

// In the frontend will be /api/order/saveReceipt
// Saves the receipt in the server
router.get('/saveReceipt/:cartId', checkUserAuth, orderController.saveReceipt);

// In the frontend will be /api/order/downloadReceipt
// TODO Downloads the receipt from the server
router.get('/downloadReceipt/:cartId', checkUserAuth, orderController.downloadReceipt);

module.exports = router;
