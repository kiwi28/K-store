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

exports.cart = (req, res, next) => {
  console.log('LOG_LA_REQUEST-----------', req.body);
  User.findById(req.body.userId)
    .then(r => {
      if (req.body.delete == true) {
        Product.findById(req.body.productId)
            .then(product => {
              r.update(
                { $pullAll: { cart: {_id: product.id}}},
                { multi: true }
              )
              console.log('log la cart arr---------------', r.cart);
              res.json(r.cart);
            })
            .catch(err => res.json({
              message: 'add product to cart err',
              err
            }));
            return ;
      } else {
        if (req.body.productId) {
          Product.findById(req.body.productId)
            .then(product => {
              r.cart.push(product);
              r.save();
              console.log('log la cart arr---------------', r.cart);
              res.json(r.cart);
            })
            .catch(err => res.json({
              message: 'add product to cart err',
              err
            }));
        } else {
          res.json(r.cart);
        }
      }
    })
    .catch(err => res.json({
      message: 'Find user err',
      err
    }))
}
