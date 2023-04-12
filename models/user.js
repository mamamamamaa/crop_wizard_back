const { Schema, model } = require("mongoose");
const { passwordRegex, emailRegex } = require("../helpres/regex");

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      matches: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    accessToken: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
); 

const User = model("user", userSchema);

module.exports = { User };
