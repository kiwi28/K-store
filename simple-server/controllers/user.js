const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "TOP_SECRET";

exports.createUser = (req, res, next) => {
  // console.log(req.body);
  bcrypt.hash(req.body.psw, 10).then(hash => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      psw: hash,
      email: req.body.email
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'New user created',
          redirect: './login.html',
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'failed to create user',
          err
        })
      })
  })
}

exports.loginUser = (req, res, next) => {
  const password = req.body.psw;
  const email = req.body.email;

  User.findOne({ email: email })
    .then(response => {
      bcrypt.compare(password, response.psw)
        .then(r => {
          const token = jwt.sign({ response }, JWT_SECRET);
            res.json({
              token,
              firstName: response.firstName,
              userId: response._id,
              redirect: './index.html'
            });
        })
        .catch(err => console.log("PASSWORDS DONT MATCH", err));
    })
    .catch(err => console.log('USER_DOES_NOT_EXISTS', err));
}

