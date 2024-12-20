// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const path = require("path");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/api", eventRoutes);

const venueRoutes = require("./routes/venue.routes");
app.use("/api/venues", venueRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use CORS middleware

module.exports = app;
