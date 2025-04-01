const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: (props) => `${props.value} must be greater than 0!`,
      },
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
