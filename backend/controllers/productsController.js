const Product = require('../models/productModel');
const mongoose = require('mongoose');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products found!',
      });
    }
    res.status(200).json({
      success: true,
      message: 'products fetched successfully',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price, image } = req.body;
  try {
    if (!name || !price || !image) {
      const error = new Error('All fields are required!');
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.create({ name, price, image });
    res.status(200).json({
      success: true,
      message: 'product created successfully',
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid product ID!');
      error.statusCode = 400;
      throw error;
    }

    // Create an object with only provided fields
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    // if (currency) updatedFields.currency = currency;
    if (image) updatedFields.image = image;

    // Prevent empty update requests
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update!',
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true, //returns the updated document
      runValidators: true, //ensure validation rules apply
    });

    //check if product exist
    if (!updatedProduct) {
      const error = new Error('No product found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid product ID!');
      error.statusCode = 400;
      throw error;
    }
    console.log(id);
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log('this is deleted', deletedProduct);

    if (!deletedProduct) {
      const error = new Error('No product found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'products removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
