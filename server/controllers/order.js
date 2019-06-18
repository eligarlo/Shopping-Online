const User = require("../models/user");

// Gets the shipment details of the user from db
exports.getShipmentDetails = (req, res, next) => {
  let fetchedUser;
  User.findOne({_id: req.params.userId})
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
