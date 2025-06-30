require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Connection = require("./db/connection");

const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true
}));



// Middleware
app.use(express.json());  // Body parser
Connection();
// Routes
app.use("/api", authRoutes);  // All auth routes go under /api

// ✅ Base test route
app.get("/", (req, res) => {
  res.send("Server is up ✅");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
