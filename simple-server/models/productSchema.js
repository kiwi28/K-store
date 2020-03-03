const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  cpu: {
    type: String,
    required: true
  },
  ram: {
    type: String,
    required: true
  },
  camera: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;