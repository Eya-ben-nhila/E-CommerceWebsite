const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  description: {
    type: String,
    maxlength: [500, 'Description too long']
  },
  category: {
    type: String,
    enum: {
      values: ['electronics', 'beverages', 'food', 'other'],
      message: '{VALUE} is not a valid category'
    },
    default: 'other'
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
ProductSchema.index({ name: 'text', category: 1 });

module.exports = mongoose.model('Product', ProductSchema);