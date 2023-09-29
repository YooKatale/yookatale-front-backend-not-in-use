// backend/notification/models.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  // Add your user schema fields here
  // Example:
  name: String,
  email: String,
  cartItems: [
    {
      productId: String,
      name: String,
      quantity: Number,
    },
  ],
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = { User };

