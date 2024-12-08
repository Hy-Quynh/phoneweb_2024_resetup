const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemaCleaner = require('../utils/schemaCleaner');

const commentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    star: {
      type: Number,
      required: true,
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userEmail: {
          type: String,
          required: false,
          trim: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        isAdmin: {
          type: Boolean,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
      },
    ],
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    isDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(uniqueValidator);
schemaCleaner(commentSchema);

module.exports = mongoose.model('comments', commentSchema);
