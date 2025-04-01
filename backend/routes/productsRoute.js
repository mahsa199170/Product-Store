const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
