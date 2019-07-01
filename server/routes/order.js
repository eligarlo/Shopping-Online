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

module.exports = router;
