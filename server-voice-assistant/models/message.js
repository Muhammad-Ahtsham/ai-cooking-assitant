const mongoose = require("mongoose");

const recipeSubSchema = new mongoose.Schema({
  type: { type: String, default: 'recipe' },
  name: String,
  difficulty: String,
  prepTime: String,
  cookTime: String,
  servings: String,
  ingredients: [String],
  instructions: [String],
  tips: [String]
});

const messageSchema = new mongoose.Schema({
  userContent: {
    type: String,
    required: true,
    trim: true,
  },
  responseContent: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  contentType: {
    type: String,
    enum: ['text', 'recipe'],
    default: 'text'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  historyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "History",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);