const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12); // Optional
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Generate JWT token without using res
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.error("Token generation error:", err);
    throw err; // re-throw for the calling function to handle
  }
};

module.exports = mongoose.model("USER", userSchema);
