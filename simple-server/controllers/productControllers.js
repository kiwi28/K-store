const Product = require('../models/productSchema');
const User = require('../models/userSchema');

exports.getProducts = (req, res, next) => {
  Product.find(req.body.filter ? { brand: req.body.filter } : {})
    .then(r => res.json(r))
    .catch(err => res.json(err))
}

exports.addProduct = (req, res, next) => {
  const product = new Product({
    brand: req.body.brand,
    model: req.body.model,
    cpu: req.body.cpu,
    ram: req.body.ram,
    camera: req.body.camera,
    size: req.body.size,
    image: "./resources/img/phones" + req.body.image,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'New product created',
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'failed to create product',
        err
      })
    })

}

exports.getProduct = (req, res, next) => {
  Product.findById(req.body.id)
    .then(r => res.json(r))
    .catch(err => res.json({
      message: 'failed to create product',
      err
    }));
}

exports.cartAdd = (req, res, next) => {
  User.findById(req.body.userId)
    .then(r => {
      if (req.body.productId) {
        Product.findById(req.body.productId)
          .then(product => {
            r.cart.push(product);
            r.save();
            res.json(r.cart);
          })
          .catch(err => res.json({
            message: 'add product to cart err',
            err
          }));
      } else {
        res.json(r.cart);
      }
    })
}

exports.cartDelete = (req, res, next) => {
  User.findById(req.body.userId)
    .then(r => {
      for (let i = 0; i < r.cart.length; i++) {
        if (r.cart[i]._id == req.body.productId) {
          r.cart.splice(i, 1);
          r.save();
          return;
        }
      }
      res.json(r.cart);
    })
    .catch(err => res.json({
      message: 'add product to cart err',
      err
    }));
}
