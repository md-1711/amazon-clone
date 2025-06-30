const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

router.get("/status", (req, res) => {
  res.json({ msg: "Auth routes are working ✅" });
});

router.post("/register", async (req, res) => {
    console.log("📩 POST /register hit");
  console.log("📦 Request body:", req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all fields properly" });
  }

  try {
    const preuser = await User.findOne({ email });

    if (preuser) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const finalUser = new User({ fname, email, mobile, password, cpassword });
      await finalUser.save();
      console.log("✅ User saved to DB, responding with 201");
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register" });
  }
});
// ➤ Login Route
// ➤ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Login request received for:", email);

  if (!email || !password) {
    console.log("❌ Missing email or password");
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await user.generateAuthToken();
    console.log("✅ Token generated:", token);

    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
