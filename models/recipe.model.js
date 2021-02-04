const mongoose = require('mongoose');

// Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);