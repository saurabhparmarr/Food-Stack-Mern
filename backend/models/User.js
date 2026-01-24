const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6  
    },

    location: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    }}
);

module.exports = mongoose.model("User", userSchema);