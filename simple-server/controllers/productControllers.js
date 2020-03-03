const Product = require('../models/productSchema');

exports.getProducts = (req, res, next) => {
  Product.find( req.body.filter ? {brand: req.body.filter} : {})
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
