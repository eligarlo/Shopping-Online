const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Check if user already is in the db
exports.checkIfUserExists = (req, res, next) => {
  if (
    req.body.username != null &&
    req.body.identityDocument != null &&
    req.body.email != null &&
    req.body.password != null &&
    req.body.passwordConfirm != null
  ) {
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    User.findOne({ username: username }, (err, dbResponse) => {
      if (err) {
        console.log(err);
      }
      if (dbResponse) {
        res.status(203).json({
          message: "Username already exists!",
          errUsername: true
        });
      } else {
        User.findOne(
          { identityDocument: req.body.identityDocument },
          (err, dbResponse) => {
            if (err) {
              console.log(err);
            }

            if (dbResponse) {
              res.status(203).json({
                message:
                  "This ID is already in our db, please enter another one!",
                errID: true
              });
            } else {
              User.findOne({ email: email }, (err, dbResponse) => {
                if (err) {
                  console.log(err);
                }

                if (dbResponse) {
                  res.status(203).json({
                    message:
                      "There is already an account with this email, please provide another one!",
                    errEmail: true
                  });
                } else if (req.body.password != req.body.passwordConfirm) {
                  res.status(203).json({
                    message: "Please enter the same password",
                    errDiffPass: true
                  });
                } else {
                  res.status(200).json({
                    userChecked: true
                  });
                }
              });
            }
          }
        );
      }
    });
  }
};

// Saves the user in the db
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      username : req.body.username,
      identityDocument: req.body.identityDocument,
      email: req.body.email,
      password: hash,
      city: req.body.city,
      street: req.body.street,
      name: req.body.name,
      surname: req.body.surname,
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      })
    })
    .catch(err => {
      if (err._message === 'User validation failed') {
        res.status(500).json({
          message: 'User already exists!'
        });
      } else {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      }
    });
  })
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({username: req.body.username})
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'There is not such a user, please register!',
        errUsername: true
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Incorrect password'
      });
    }
    const token = jwt.sign(
      {username: fetchedUser.username, userId: fetchedUser._id}, process.env.JWT_KEY
    );
    if (fetchedUser.role === 1) {
      return res.status(200).json({
        token: token,
        userId: fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email,
        role: fetchedUser.role
      })
    }
    return res.status(200).json({
      token: token,
      userId: fetchedUser._id,
      name: fetchedUser.name,
      email: fetchedUser.email,
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  });
};
